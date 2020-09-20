import { IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  picklocation: string;

  @IsNotEmpty()
  droplocation: string;

  @IsNotEmpty()
  customer: {
    id: string;
    fullname: string;
    homeaddress: string;
    emailaddress: string;
    dateofbirth: string;
    telephonenumber: string;
  };
}
