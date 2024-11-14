import { Injectable } from '@nestjs/common';

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
  ];

  findAll() {
    return this.users;
  }
}
