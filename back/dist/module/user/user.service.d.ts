import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SigninAuthDto } from '../auth/dto/signin-auth.dto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    create(createUserDto: CreateUserDto): Promise<UserEntity>;
    findAll(page: number, limit: number): Promise<UserEntity[]>;
    findOne(id: string): Promise<UserEntity>;
    findByEmail(signin: SigninAuthDto): Promise<UserEntity | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity>;
    remove(id: string): Promise<UserEntity>;
}
