import { OrderEntity } from 'src/module/order/entities/order.entity';
import { ProductEntity } from 'src/module/product/entities/product.entity';
export declare class OrderDetailEntity {
    id: number;
    totalPrice: number;
    order: OrderEntity;
    products: ProductEntity[];
}
