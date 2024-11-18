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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_service_1 = require("../module/auth/auth.service");
const category_seed_1 = require("../module/category/category.seed");
const category_entity_1 = require("../module/category/entities/category.entity");
const product_entity_1 = require("../module/product/entities/product.entity");
const product_seed_1 = require("../module/product/product.seed");
const user_entity_1 = require("../module/user/entities/user.entity");
const user_seeder_1 = require("../module/user/user.seeder");
const user_service_1 = require("../module/user/user.service");
let SeederModule = class SeederModule {
    constructor(categorySeed, productSeed, userSeeder) {
        this.categorySeed = categorySeed;
        this.productSeed = productSeed;
        this.userSeeder = userSeeder;
        this.seed();
    }
    async seed() {
        await this.categorySeed.seedCategory();
        await this.productSeed.seedProduct();
        await this.userSeeder.seed();
    }
};
exports.SeederModule = SeederModule;
exports.SeederModule = SeederModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([category_entity_1.CategoryEntity, product_entity_1.ProductEntity, user_entity_1.UserEntity]),
        ],
        providers: [category_seed_1.CategorySeed, product_seed_1.ProductSeed, user_seeder_1.UserSeeder, auth_service_1.AuthService, user_service_1.UserService],
    }),
    __metadata("design:paramtypes", [category_seed_1.CategorySeed,
        product_seed_1.ProductSeed,
        user_seeder_1.UserSeeder])
], SeederModule);
//# sourceMappingURL=seeder.module.js.map