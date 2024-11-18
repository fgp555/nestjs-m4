import { OrderDetailEntity } from 'src/module/order-detail/entities/order-detail.entity';
import { UserEntity } from 'src/module/user/entities/user.entity';
export declare class OrderEntity {
    id: string;
    user: UserEntity;
    createdAt: Date;
    orderDetails: OrderDetailEntity;
}
