import {
  BaseEntity,
  Column,
  Entity,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';
import { BookingStatus } from './booking-status.enum';
// import { Customer } from '../customer/customer.entity';

@Entity()
export class Booking extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  picklocation: string;

  @Column()
  droplocation: string;

  @Column()
  status: BookingStatus;

  @Column()
  distributorid: string;

  @Column()
  customerid: string;

  // @Column(() => Customer)
  // customer: Customer;
}
