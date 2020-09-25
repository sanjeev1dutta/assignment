import { ApiClient } from './utility/api-client.utility';
import { GetBookingsFilterDto } from './dto/get-bookings-filter.dto';
import { User } from './../auth/user.entity';
import { BookingRepository } from './booking.repository';
import { BookingStatus } from './booking-status.enum';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './booking.entity';
import { BadRequestException, HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationService } from 'src/utility/location.service';
import { countries } from 'src/utility/country';

import * as config from 'config';

const custConfig = config.get('cust');

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(BookingRepository)
    private bookingRepository: BookingRepository,
    private locationService: LocationService,
    private readonly http: HttpService,
  ) {}

  async createBooking(
    createBookingDto: CreateBookingDto,
    user: User,
  ): Promise<Booking> {
    //location of PII storage is defined by customer residence country
    const data = await this.getApiEndpointInput(createBookingDto, user);
    const url = this.getApiEndpointUrl(data['country']);
    const client = new ApiClient(this.http);
    const custStore = await client.post(url, data, {
      Authorization: `${data['jwt']}`,
    });

    const { status } = custStore;
    if (status === 201) {
      return await this.bookingRepository.createBooking(createBookingDto, user);
    }
    return null;
  }

  async getAllBookings(user: User): Promise<Booking[]> {
    return await this.bookingRepository.getAllBookings(user);
  }

  async getBookingsWithFilter(
    filterDto: GetBookingsFilterDto,
    user: User,
  ): Promise<Booking[]> {
    const { search } = filterDto;
    let bookings = await this.getAllBookings(user);
    if (search) {
      bookings = bookings.filter(booking => {
        let flag = false;
        Object.keys(booking).forEach(key => {
          if (booking[key] === search) {
            flag = true;
            return;
          }
        });
        return flag;
      });
    }
    return bookings;
  }

  async getBookingById(id: string, user: User): Promise<Booking> {
    return await this.bookingRepository.getBookingById(id, user);
  }

  async updateBookingStatus(
    id: string,
    status: BookingStatus,
    user: User,
  ): Promise<Booking> {
    await this.bookingRepository.updateBookingStatus(id, status, user);
    return await this.getBookingById(id, user);
  }

  async deleteBooking(id: string, user: User): Promise<void> {
    await this.bookingRepository.deleteBooking(id, user);
  }

  private async getApiEndpointInput(
    createBookingDto: CreateBookingDto,
    user: User,
  ): Promise<any> {
    const { customer } = createBookingDto;
    const data = {};
    data['jwt'] = user['jwt'];
    data['payload'] = {
      id: customer.id,
      fullname: customer.fullname,
      homeaddress: customer.homeaddress,
      emailaddress: customer.emailaddress,
      dateofbirth: customer.dateofbirth,
      telephonenumber: customer.dateofbirth,
    };

    const country = await this.locationService.geoCountry(customer.homeaddress);
    data['country'] = this.getCountryCode(country);
    return data;
  }

  private getApiEndpointUrl(code: string): string {
    switch (code.toUpperCase()) {
      case 'US':
        return process.env.US_URL || custConfig.usurl;
      case 'GB':
      default:
        return process.env.UK_URL || custConfig.ukurl;
    }
  }

  private getCountryCode(arrCountry): string {
    const [...countryCodes] = arrCountry.map(item => item.countryCode);
    if (
      countryCodes &&
      countryCodes.length > 0 &&
      countryCodes.every((val, i, arr) => val === arr[0])
    ) {
      if (countries.some(item => item.code === countryCodes[0].toUpperCase())) {
        return countryCodes[0];
      }
    }
    throw new BadRequestException('Customer country not recognizable');
  }
}
