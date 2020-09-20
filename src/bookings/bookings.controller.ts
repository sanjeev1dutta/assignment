import { GetBookingsFilterDto } from './dto/get-bookings-filter.dto';
import { User } from './../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { BookingStatusValidationPipe } from './pipes/booking-status-validation.pipe';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './booking.entity';
import { BookingsService } from './bookings.service';
import { Request } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BookingStatus } from './booking-status.enum';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('bookings')
@UseGuards(AuthGuard())
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createBooking(
    @Req() request: Request,
    @Body() createBookingDto: CreateBookingDto,
    @GetUser() user: User,
  ): Promise<Booking> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    user['jwt'] = jwt;
    return this.bookingsService.createBooking(createBookingDto, user);
  }

  @Get()
  getBookings(
    @Query() filterDto: GetBookingsFilterDto,
    @GetUser() user: User,
  ): Promise<Booking[]> {
    if (Object.keys(filterDto).length) {
      return this.bookingsService.getBookingsWithFilter(filterDto, user);
    } else {
      return this.bookingsService.getAllBookings(user);
    }
  }

  @Get('/:id')
  getBookingById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Booking> {
    return this.bookingsService.getBookingById(id, user);
  }

  @Patch('/:id/status')
  updateBookingStatus(
    @Param('id') id: string,
    @Body('status', BookingStatusValidationPipe) status: BookingStatus,
    @GetUser() user: User,
  ): Promise<Booking> {
    return this.bookingsService.updateBookingStatus(id, status, user);
  }

  @Delete('/:id')
  deleteBooking(@Param('id') id: string, @GetUser() user: User): void {
    this.bookingsService.deleteBooking(id, user);
  }
}
