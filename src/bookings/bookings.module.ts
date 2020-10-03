import { HttpModule, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { BookingRepository } from './booking.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { LocationService } from 'src/utility/location.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingRepository]),
    HttpModule,
    AuthModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService, LocationService],
})
export class BookingsModule {}
