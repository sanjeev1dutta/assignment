import { AuthRepository } from './auth.repository';
import { JwtPayload } from './jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(AuthRepository) private authRepository: AuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
    });
  }

  async validate(payload: JwtPayload) {
    const { username } = payload;
    const user = this.authRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }
}
