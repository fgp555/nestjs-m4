import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { OrderDetailEntity } from '../order-detail/entities/order-detail.entity';
import { log } from 'console';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @InjectRepository(OrderDetailEntity)
    private readonly orderDetailRepository: Repository<OrderDetailEntity>,
  ) {}

  async create(createOrderDto: any) {
    const foundUser = await this.userRepository.findOneBy({
      id: createOrderDto.userId,
    });

    if (!foundUser) throw new NotFoundException('User not found');

    let totalPrice = 0;
    let productArray = [];

    for (const element of createOrderDto.products) {
      // ========== Find Product ==========
      const findProduct = await this.productRepository.findOneBy({
        id: element.id,
      });

      if (!findProduct)
        throw new NotFoundException(`Product ${element.id} not found`);

      // ========== Update Stock ==========
      if (findProduct.stock < 1)
        throw new BadRequestException('Product out of stock');

      findProduct.stock -= 1;
      await this.productRepository.save(findProduct);

      // ========== Total Price ==========
      totalPrice += Number(findProduct.price);

      // ========== productArray ==========
      productArray.push(findProduct);
    }
    // ========== Create Order Detail ==========
    const saveOrderDetail = this.orderDetailRepository.create({
      totalPrice,
      // products: productArray,
      products: createOrderDto.products,
    });

    // ========== Create Order ==========
    const saveOrder = await this.orderRepository.save({
      user: foundUser,
      orderDetails: saveOrderDetail,
      id: createOrderDto.id,
    });

    return saveOrder;
  }

  async findAll() {
    return this.orderRepository.find();
  }

  async findOne(id: string) {
    return this.orderRepository.findOneBy({ id });
  }

  async update(id: string, updateOrderDto: any) {
    // Buscar la orden existente
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['orderDetails', 'orderDetails.products'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }
    console.log('order', order);
    // Verificar la existencia del usuario si es necesario actualizarlo
    if (updateOrderDto.userId) {
      const foundUser = await this.userRepository.findOneBy({
        id: updateOrderDto.userId,
      });
      if (!foundUser) throw new NotFoundException('User not found');
      order.user = foundUser;
    }

    // Procesar los productos de la orden
    let totalPrice = 0;
    if (updateOrderDto.products) {
      // Resetear el stock de los productos actuales
      for (const existingProduct of order.orderDetails.products) {
        existingProduct.stock += 1;
        await this.productRepository.save(existingProduct);
      }

      // Actualizar el array de productos y calcular el precio total
      const productArray = [];
      for (const element of updateOrderDto.products) {
        const product = await this.productRepository.findOneBy({
          id: element.id,
        });

        if (!product)
          throw new NotFoundException(`Product ${element.id} not found`);

        if (product.stock < 1)
          throw new BadRequestException(
            `Product ${element.id} is out of stock`,
          );

        product.stock -= 1;
        await this.productRepository.save(product);

        totalPrice += Number(product.price);
        productArray.push(product);
      }

      // Actualizar el detalle de la orden
      const updatedOrderDetail = await this.orderDetailRepository.preload({
        id: order.orderDetails.id,
        totalPrice,
        products: productArray,
      });
      await this.orderDetailRepository.save(updatedOrderDetail);
      order.orderDetails = updatedOrderDetail;
    }

    // Guardar la orden actualizada
    const updatedOrder = await this.orderRepository.save(order);

    return updatedOrder;
  }

  async remove(id: string) {
    return this.orderRepository.delete(id);
  }
}
