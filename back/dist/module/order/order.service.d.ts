import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { OrderDetailEntity } from '../order-detail/entities/order-detail.entity';
export declare class OrderService {
    private readonly orderRepository;
    private readonly userRepository;
    private readonly productRepository;
    private readonly orderDetailRepository;
    constructor(orderRepository: Repository<OrderEntity>, userRepository: Repository<UserEntity>, productRepository: Repository<ProductEntity>, orderDetailRepository: Repository<OrderDetailEntity>);
    create(createOrderDto: CreateOrderDto): Promise<OrderEntity>;
    findAll(): Promise<OrderEntity[]>;
    findOne(id: string): Promise<OrderEntity>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<OrderEntity>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
