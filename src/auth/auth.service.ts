import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthRepository } from './auth.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { AuthSignUpDto } from './dto/auth-signup.dto';

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
    const username = await this.userRepository.validateUserPassword(
      authCredentialDto,
    );

    if (!username) {
      throw new UnauthorizedException('Invalid user credentials');
    }

    const tokenPayload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(tokenPayload);
    return { accessToken };
  }

  async getUser(username: string): Promise<User> {
    return await this.userRepository.getUser(username);
  }
}
