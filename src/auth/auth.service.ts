import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthRepository } from './auth.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { SigninException } from 'src/exception/signin.exception';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private userRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authSignUpDto: AuthSignUpDto): Promise<void> {
    return await this.userRepository.signUp(authSignUpDto);
  }

  async signIn(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    const user: User = await this.userRepository.validateUserPassword(
      authCredentialDto,
    );

    if (!user) {
      throw new SigninException('Invalid user credentials');
    }

    const tokenPayload: JwtPayload = { id: user.id, username: user.username };
    const accessToken = await this.jwtService.sign(tokenPayload);
    return { accessToken };
  }

  async getUser(username: string): Promise<User> {
    return await this.userRepository.getUser(username);
  }
}
