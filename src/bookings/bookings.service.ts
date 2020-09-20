import { GetBookingsFilterDto } from './dto/get-bookings-filter.dto';
import { User } from './../auth/user.entity';
import { BookingRepository } from './booking.repository';
import { BookingStatus } from './booking-status.enum';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './booking.entity';
import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(BookingRepository)
    private bookingRepository: BookingRepository,
    private readonly http: HttpService,
  ) {}

  async createBooking(
    createBookingDto: CreateBookingDto,
    user: User,
  ): Promise<Booking> {
    // this.http
    //   .get('http://localhost:4000/customers?search=d1c2@d1.com', {
    //     headers: [
    //       {
    //         Authorization:
    //           'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRJU1RSSUJVVEVSMSIsImlhdCI6MTYwMDU5Njc5MSwiZXhwIjoxNjAwNjAwMzkxfQ.Wae9itPrehwoOItbatMRHfJP1S6VDFH4BQMKmW0SAJA',
    //       },
    //       { 'Content-Type': 'application/json' },
    //     ],
    //   })
    //   .subscribe({
    //     next(x) {
    //       console.log('got value ' + x);
    //     },
    //     error(err) {
    //       console.error('something wrong occurred: ' + err);
    //     },
    //     complete() {
    //       console.log('done');
    //     },
    //   });

    //.toPromise()
    //.then(res => {
    //console.log(response);
    //})
    //.catch(error => {
    //   console.log(error);
    // });

    return await this.bookingRepository.createBooking(createBookingDto, user);
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
}
