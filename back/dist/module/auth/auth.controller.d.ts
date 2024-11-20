import { AuthService } from './auth.service';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { SigUpAuthDto } from './dto/signup-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
