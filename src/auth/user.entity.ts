import {
  BaseEntity,
  Column,
  Entity,
  ObjectIdColumn,
  // OneToMany,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username']) // to prevent duplicate username at database level
export class User extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  fullname: string;

  @Column()
  homeaddress: string;

  @Column()
  emailaddress: string;

  @Column()
  dateofbirth: string;

  @Column()
  telephonenumber: string;

  // @Column()
  // usertype: UserType;

  // @OneToMany(
  //   type => Booking,
  //   booking => booking.user,
  //   { eager: true },
  // )
  // bookings: Booking[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
