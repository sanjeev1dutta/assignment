import { User } from './user.entity';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';

@Controller('auth')
@UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authSignUpDto: AuthSignUpDto): Promise<void> {
    return this.authService.signUp(authSignUpDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialDto);
  }

  @Get('/:username')
  getUser(@Param('username') username: string): Promise<User> {
    return this.authService.getUser(username);
  }

  // @Post('/test')
  // @UseGuards(AuthGuard())
  // test(@GetUser() user: User) {
  //   console.log(user);
  // }
}
