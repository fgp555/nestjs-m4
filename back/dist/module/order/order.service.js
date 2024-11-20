"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("./entities/order.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const product_entity_1 = require("../product/entities/product.entity");
const order_detail_entity_1 = require("../order-detail/entities/order-detail.entity");
let OrderService = class OrderService {
    constructor(orderRepository, userRepository, productRepository, orderDetailRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.orderDetailRepository = orderDetailRepository;
    }
    async create(createOrderDto) {
        const foundUser = await this.userRepository.findOneBy({
            id: createOrderDto.userId,
        });
        if (!foundUser) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        let totalPrice = 0;
        const productArray = [];
        for (const element of createOrderDto.products) {
            const findProduct = await this.productRepository.findOneBy({
                id: element.id,
            });
            if (!findProduct) {
                throw new common_1.NotFoundException(`Producto con ID ${element.id} no encontrado`);
            }
            if (findProduct.stock < 1) {
                throw new common_1.BadRequestException(`Producto con ID ${element.id} sin stock`);
            }
            findProduct.stock -= 1;
            await this.productRepository.save(findProduct);
            totalPrice += Number(findProduct.price);
            productArray.push(findProduct);
        }
        const orderDetail = this.orderDetailRepository.create({
            totalPrice,
            products: productArray,
        });
        const savedOrderDetail = await this.orderDetailRepository.save(orderDetail);
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
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al obtener las órdenes');
        }
    }
    async findOne(id) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['user', 'orderDetails', 'orderDetails.products'],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Orden con ID "${id}" no encontrada`);
        }
        return order;
    }
    async update(id, updateOrderDto) {
        const order = await this.findOne(id);
        if (updateOrderDto.userId) {
            const foundUser = await this.userRepository.findOneBy({
                id: updateOrderDto.userId,
            });
            if (!foundUser) {
                throw new common_1.NotFoundException('Usuario no encontrado');
            }
            order.user = foundUser;
        }
        if (updateOrderDto.products) {
            let totalPrice = 0;
            const productArray = [];
            for (const existingProduct of order.orderDetails.products) {
                existingProduct.stock += 1;
                await this.productRepository.save(existingProduct);
            }
            for (const element of updateOrderDto.products) {
                const product = await this.productRepository.findOneBy({
                    id: element.id,
                });
                if (!product) {
                    throw new common_1.NotFoundException(`Producto con ID ${element.id} no encontrado`);
                }
                if (product.stock < 1) {
                    throw new common_1.BadRequestException(`Producto con ID ${element.id} sin stock`);
                }
                product.stock -= 1;
                await this.productRepository.save(product);
                totalPrice += Number(product.price);
                productArray.push(product);
            }
            const updatedOrderDetail = await this.orderDetailRepository.preload({
                id: order.orderDetails.id,
                totalPrice,
                products: productArray,
            });
            order.orderDetails =
                await this.orderDetailRepository.save(updatedOrderDetail);
        }
        return await this.orderRepository.save(order);
    }
    async remove(id) {
        await this.findOne(id);
        return this.orderRepository.delete(id);
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(order_detail_entity_1.OrderDetailEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrderService);
//# sourceMappingURL=order.service.js.map