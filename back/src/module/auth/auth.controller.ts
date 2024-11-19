import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { SigUpAuthDto } from './dto/signup-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() signup: SigUpAuthDto) {
    return this.authService.signup(signup);
  }

  @Post('signin')
  signin(@Body() signin: SigninAuthDto) {
    return this.authService.signin(signin);
  }
}
