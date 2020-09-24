import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthSignUpDto {
  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  fullname: string;

  // @IsString()
  // @MinLength(1)
  // @MaxLength(100)
  @ApiProperty()
  homeaddress: string;

  // @IsString()
  // @MinLength(5)
  // @MaxLength(50)
  @ApiProperty()
  emailaddress: string;

  // @IsString()
  @ApiProperty({ required: false })
  dateofbirth: string;

  // @IsNumberString()
  // @MinLength(6)
  // @MaxLength(15)
  @ApiProperty({ required: false })
  telephonenumber: string;
}
