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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("../category/entities/category.entity");
const productSeed = require("../../seed/data/products-seeder.json");
let ProductService = class ProductService {
    constructor(productRepository, categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }
    async create(createProductDto) {
        try {
            const foundCategory = await this.categoryRepository.findOneBy({
                name: createProductDto.category,
            });
            if (!foundCategory) {
                throw new common_1.NotFoundException(`Categoría "${createProductDto.category}" no encontrada`);
            }
            const product = this.productRepository.create({
                ...createProductDto,
                category: foundCategory,
            });
            return await this.productRepository.save(product);
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al crear el producto');
        }
    }
    async findAll(page, limit) {
        if (page < 1 || limit < 1) {
            throw new common_1.BadRequestException('Los parámetros de paginación deben ser mayores a 0');
        }
        const skip = (page - 1) * limit;
        try {
            return await this.productRepository.find({
                skip: skip,
                take: limit,
                order: { id: 'ASC' },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al obtener los productos');
        }
    }
    async findOne(id) {
        try {
            const product = await this.productRepository.findOneBy({ id });
            if (!product) {
                throw new common_1.NotFoundException(`Producto con ID "${id}" no encontrado`);
            }
            return product;
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al intentar obtener el producto por ID');
        }
    }
    async update(id, updateProductDto) {
        const product = await this.findOne(id);
        const foundCategory = await this.categoryRepository.findOneBy({
            name: updateProductDto.category,
        });
        if (!foundCategory) {
            throw new common_1.NotFoundException(`Categoría "${updateProductDto.category}" no encontrada`);
        }
        try {
            const updatedProduct = this.productRepository.merge(product, {
                ...updateProductDto,
                category: foundCategory,
            });
            return await this.productRepository.save(updatedProduct);
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al actualizar el producto');
        }
    }
    async updateImage(productId, secure_url) {
        const findProduct = await this.findOne(productId);
        findProduct.imgUrl = secure_url;
        return await this.productRepository.save(findProduct);
    }
    async remove(id) {
        await this.findOne(id);
        try {
            const result = await this.productRepository.delete(id);
            if (result.affected === 0) {
                throw new common_1.NotFoundException(`Producto con ID "${id}" no encontrado`);
            }
            return result;
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al eliminar el producto');
        }
    }
    async removeAll() {
        try {
            return await this.productRepository.delete({});
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al eliminar todos los productos');
        }
    }
    async seedProduct() {
        const existingProducts = await this.productRepository.find();
        if (existingProducts.length > 0) {
            throw new common_1.ConflictException('Los productos ya han sido cargados');
        }
        try {
            for (const element of productSeed) {
                const foundCategory = await this.categoryRepository.findOneBy({
                    name: element.category,
                });
                if (!foundCategory) {
                    throw new common_1.NotFoundException(`Categoría "${element.category}" no encontrada para el producto "${element.name}"`);
                }
                await this.productRepository.save({
                    ...element,
                    category: foundCategory,
                });
            }
            console.log('Productos cargados exitosamente');
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al realizar el seeding de productos');
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.CategoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=product.service.js.map