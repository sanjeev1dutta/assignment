// import { UserType } from './../user-type.enum';
import {
  // IsNumberString,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthSignUpDto {
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;

  @IsString()
  @MinLength(1)
  @MaxLength(30)
  fullname: string;

  // @IsString()
  // @MinLength(1)
  // @MaxLength(100)
  homeaddress: string;

  // @IsString()
  // @MinLength(5)
  // @MaxLength(50)
  emailaddress: string;

  // @IsString()
  dateofbirth: string;

  // @IsNumberString()
  // @MinLength(6)
  // @MaxLength(15)
  telephonenumber: string;

  // usertype: UserType;
}
