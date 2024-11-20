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
exports.ProductSeed = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
const category_entity_1 = require("../category/entities/category.entity");
const productSeed = require("../../seed/data/products-seeder.json");
let ProductSeed = class ProductSeed {
    constructor(productRepository, categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }
    async seedProduct() {
        const existProduct = await this.productRepository.find();
        if (existProduct.length > 0)
            return console.log('product already exist');
        for (const element of productSeed) {
            const foundCategory = await this.categoryRepository.findOneBy({
                name: element.category,
            });
            const saveProduct = await this.productRepository.save({
                ...element,
                category: foundCategory,
            });
        }
        const [firstProduct] = await this.productRepository.find({ take: 1 });
        const lastProduct = await this.productRepository.find({
            order: { id: 'DESC' },
            relations: ['orderDetails', 'category'],
            take: 1,
        });
        console.log("Products Seeder success!!!");
    }
};
exports.ProductSeed = ProductSeed;
exports.ProductSeed = ProductSeed = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.CategoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductSeed);
//# sourceMappingURL=product.seed.js.map