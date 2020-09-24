import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty()
  @IsNotEmpty()
  homeaddress: string;

  @ApiProperty()
  @IsNotEmpty()
  emailaddress: string;

  @ApiProperty({ required: false })
  dateofbirth: string;

  @ApiProperty({ required: false })
  telephonenumber: string;
}

export class CreateBookingDto {
  @ApiProperty()
  @IsNotEmpty()
  picklocation: string;

  @ApiProperty()
  @IsNotEmpty()
  droplocation: string;

  @ApiProperty()
  @IsNotEmpty()
  customer: CreateCustomerDto;
}
