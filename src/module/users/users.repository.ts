import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './entities/user.interface';

@Injectable()
export class UsersRepository {
  private users = [
    {
      id: 1,
      email: 'j@j.com',
      name: 'John',
      password: '123',
      address: 'address',
      phone: 321654,
      country: 'country',
      city: 'city',
    },
    {
      id: 2,
      email: 'j@j.com',
      name: 'John',
      password: '123',
      address: 'address',
      phone: 321654,
      country: 'country',
      city: 'city',
    },
    {
      id: 3,
      email: 'j@j.com',
      name: 'John',
      password: '123',
      address: 'address',
      phone: 321654,
      country: 'country',
      city: 'city',
    },
  ];

  create(user: Omit<IUser, 'id'>) {
    let id = this.users.length + 1;
    const newUser = this.users.push({ id, ...user });
    return { newUser };
  }

  findAll(page: number, limit: number) {
    const start = (page - 1) * limit;
    const end = start + limit;
    const userSlice = this.users.slice(start, end);
    const withoutPassword = userSlice.map(({ password, ...user }) => user);
    // const newUsers = this.users.map(({ password, ...user }) => user);
    return withoutPassword;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    const { password, ...newUser } = user;
    return newUser;
  }

  findEmail(email: string) {
    const user = this.users.find((user) => user.email === email);
    // const { password, ...newUser } = user;
    return user;
  }

  update(id: number, user: Omit<IUser, 'id'>) {
    const findUser = this.users.find((user) => user.id === id);
    if (findUser) {
      const updateUser = Object.assign(findUser, user);
      return updateUser.id;
    } else {
      return 'user no found';
    }
  }

  remove(id: number) {
    const userIndex = this.users.findIndex((user) => user.id == id);
    if (userIndex === -1) {
      return 'User not found';
    }
    const [removedUser] = this.users.splice(userIndex, 1);

    return removedUser.id;
  }
}
