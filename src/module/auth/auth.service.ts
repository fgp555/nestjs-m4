import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  signin(signin: any) {
    const { email, password } = signin;
    const foundEmail = this.usersRepository.findEmail(email);
    if (!foundEmail || foundEmail.password !== password) {
      return 'Email o password incorrectos';
    }
    return foundEmail;
  }
}
