import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { SigUpAuthDto } from './dto/signup-auth.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(signup: SigUpAuthDto) {
    return this.userService.create(signup);
  }

  async signin(signin: SigninAuthDto) {
    const foundEmail = await this.userService.findByEmail(signin);
    if (!foundEmail || foundEmail.password !== signin.password) {
      throw new UnauthorizedException('Email o contraseña incorrectos');
    }
    return foundEmail;
  }
}
