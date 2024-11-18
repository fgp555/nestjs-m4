import { OrderEntity } from 'src/module/order/entities/order.entity';
export declare class UserEntity {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: number;
    country: string;
    address: string;
    city: string;
    orders: OrderEntity[];
    isAdmin: boolean;
}
