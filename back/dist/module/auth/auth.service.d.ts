import { SigninAuthDto } from './dto/signin-auth.dto';
import { SigUpAuthDto } from './dto/signup-auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    signup(signup: SigUpAuthDto): Promise<{
        id: string;
        name: string;
        email: string;
        phone: number;
        country: string;
        address: string;
        city: string;
        orders: import("../order/entities/order.entity").OrderEntity[];
        isAdmin: boolean;
    }>;
    signin(signin: SigninAuthDto): Promise<{
        token: string;
        user: {
            id: string;
            name: string;
            email: string;
            phone: number;
            country: string;
            address: string;
            city: string;
            orders: import("../order/entities/order.entity").OrderEntity[];
            isAdmin: boolean;
        };
    }>;
}
