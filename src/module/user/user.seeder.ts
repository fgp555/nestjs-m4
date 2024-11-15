import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

const userDemo = {
  id: 'ffffffff-0000-0000-0000-ffffffff0001',
  name: 'User Demo',
  email: 'user_demo@mail.com',
  password: 'PassWord123',
  phone: 123456789,
  country: 'Perú',
  address: 'HCM',
  city: 'city',
};

@Injectable()
export class UserSeeder {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    // this.seed();
  }

  async seed() {
    const existUser = await this.userRepository.find();
    if (existUser.length > 0) return console.log('user already exist');
    const saveUser = await this.userRepository.save(userDemo);
    // console.log('saveUser', saveUser);
    console.log('User Seeder successfully!!!');
  }
}
