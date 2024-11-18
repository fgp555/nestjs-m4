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

  async create(createOrderDto: CreateOrderDto) {
    // Verificar si el usuario existe
    const foundUser = await this.userRepository.findOneBy({
      id: createOrderDto.userId,
    });

    if (!foundUser) {
      throw new NotFoundException('Usuario no encontrado');
    }

    let totalPrice = 0;
    const productArray = [];

    for (const element of createOrderDto.products) {
      // Buscar el producto
      const findProduct = await this.productRepository.findOneBy({
        id: element.id,
      });

      if (!findProduct) {
        throw new NotFoundException(
          `Producto con ID ${element.id} no encontrado`,
        );
      }

      // Verificar el stock
      if (findProduct.stock < 1) {
        throw new BadRequestException(
          `Producto con ID ${element.id} sin stock`,
        );
      }

      // Actualizar el stock
      findProduct.stock -= 1;
      await this.productRepository.save(findProduct);

      // Calcular el precio total
      totalPrice += Number(findProduct.price);

      productArray.push(findProduct);
    }

    // Crear y guardar el detalle de la orden
    const orderDetail = this.orderDetailRepository.create({
      totalPrice,
      products: productArray,
    });
    const savedOrderDetail = await this.orderDetailRepository.save(orderDetail);

    // Crear y guardar la orden
    const order = this.orderRepository.create({
      user: foundUser,
      orderDetails: savedOrderDetail,
      id: createOrderDto.id,
    });

    return await this.orderRepository.save(order);
  }

  async findAll() {
    try {
      return await this.orderRepository.find({
        relations: ['user', 'orderDetails', 'orderDetails.products'],
      });
    } catch (error) {
      throw new BadRequestException('Error al obtener las órdenes');
    }
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'orderDetails', 'orderDetails.products'],
    });

    if (!order) {
      throw new NotFoundException(`Orden con ID "${id}" no encontrada`);
    }

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);

    // Actualizar el usuario si es necesario
    if (updateOrderDto.userId) {
      const foundUser = await this.userRepository.findOneBy({
        id: updateOrderDto.userId,
      });

      if (!foundUser) {
        throw new NotFoundException('Usuario no encontrado');
      }

      order.user = foundUser;
    }

    // Procesar productos si se proporcionan
    if (updateOrderDto.products) {
      let totalPrice = 0;
      const productArray = [];

      // Restablecer el stock de los productos actuales
      for (const existingProduct of order.orderDetails.products) {
        existingProduct.stock += 1;
        await this.productRepository.save(existingProduct);
      }

      // Verificar y actualizar nuevos productos
      for (const element of updateOrderDto.products) {
        const product = await this.productRepository.findOneBy({
          id: element.id,
        });

        if (!product) {
          throw new NotFoundException(
            `Producto con ID ${element.id} no encontrado`,
          );
        }

        if (product.stock < 1) {
          throw new BadRequestException(
            `Producto con ID ${element.id} sin stock`,
          );
        }

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

      order.orderDetails =
        await this.orderDetailRepository.save(updatedOrderDetail);
    }

    // Guardar la orden actualizada
    return await this.orderRepository.save(order);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.orderRepository.delete(id);
  }
}
