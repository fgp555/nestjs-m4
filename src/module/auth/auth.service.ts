import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { SigUpAuthDto } from './dto/signup-auth.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // ========== signup ==========
  async signup(signup: SigUpAuthDto) {
    if (signup.password !== signup.confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    const hashedPassword = await bcrypt.hash(signup.password, 10);
    if (!hashedPassword) {
      throw new BadRequestException('Error al hashear la contraseña');
    }

    signup.password = hashedPassword;

    const createUser = await this.userService.create(signup);
    const { password, ...withoutPassword } = createUser;
    return withoutPassword;
  }

  // ========== signin ==========
  async signin(signin: SigninAuthDto) {
    const foundEmail = await this.userService.findByEmail(signin);
    if (!foundEmail)
      throw new UnauthorizedException('Email o contraseña incorrectos');

    const isPasswordValid = await bcrypt.compare(
      signin.password,
      foundEmail.password,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException('Email o contraseña incorrectos');

    const { password, ...withoutPassword } = foundEmail;

    const userPayload = {
      sub: foundEmail.id,
      id: foundEmail.id,
      email: foundEmail.email,
    };

    const token = this.jwtService.sign(userPayload);

    return { token, user: withoutPassword };
  }
}
