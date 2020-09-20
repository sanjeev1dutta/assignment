// import { Customer } from './customer/customer.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingsModule } from './bookings/bookings.module';
import { AuthModule } from './auth/auth.module';
// import { CustomerModule } from './customer/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './bookings/booking.entity';
import { User } from './auth/user.entity';

@Module({
  imports: [
    BookingsModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/carrental1',
      synchronize: true,
      useUnifiedTopology: true, //mongodb specific - purpose not clear, perhaps to be used to handle some depreciation in future
      entities: [Booking, User], //Customer],
    }),
    AuthModule,
    // CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
