import { CategoryEntity } from 'src/module/category/entities/category.entity';
import { OrderDetailEntity } from 'src/module/order-detail/entities/order-detail.entity';
export declare class ProductEntity {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imgUrl: string;
    category: CategoryEntity;
    orderDetails: OrderDetailEntity[];
}
