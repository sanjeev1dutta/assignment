import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { AuthSignUpDto } from './dto/auth-signup.dto';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async signUp(authSignUpDto: AuthSignUpDto): Promise<void> {
    const {
      username,
      password,
      fullname,
      homeaddress,
      emailaddress,
      dateofbirth,
      telephonenumber,
      // usertype,
    } = authSignUpDto;

    const user = new User();
    user.id = uuid();
    user.fullname = fullname;
    user.homeaddress = homeaddress;
    user.emailaddress = emailaddress;
    user.dateofbirth = dateofbirth;
    user.telephonenumber = telephonenumber;
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    // user.usertype = usertype;

    try {
      await user.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(`Username already exists`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentialDto: AuthCredentialDto,
  ): Promise<string> {
    const { username, password } = authCredentialDto;
    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
