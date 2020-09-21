import { IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  fullname: string;

  @IsNotEmpty()
  homeaddress: string;

  @IsNotEmpty()
  emailaddress: string;

  dateofbirth: string;

  telephonenumber: string;
}

export class CreateBookingDto {
  @IsNotEmpty()
  picklocation: string;

  @IsNotEmpty()
  droplocation: string;

  @IsNotEmpty()
  customer: CreateCustomerDto;
}
