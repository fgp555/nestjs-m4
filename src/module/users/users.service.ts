import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { IUser } from './entities/user.interface';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(user: Omit<IUser, 'id'>) {
    return this.usersRepository.create(user);
  }

  findAll(page: number, limit: number) {
    return this.usersRepository.findAll(page, limit);
  }

  findOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  update(id: number, user: Omit<IUser, 'id'>) {
    return this.usersRepository.update(id, user);
  }

  remove(id: number) {
    return this.usersRepository.remove(id);
  }
}
