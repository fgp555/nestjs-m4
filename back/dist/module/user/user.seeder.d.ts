import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
export declare class UserSeeder {
    private readonly userRepository;
    private readonly authService;
    constructor(userRepository: Repository<UserEntity>, authService: AuthService);
    seed(): Promise<void>;
}
