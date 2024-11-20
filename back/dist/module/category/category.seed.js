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
exports.CategorySeed = exports.categorySeed = void 0;
const common_1 = require("@nestjs/common");
const category_entity_1 = require("./entities/category.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
exports.categorySeed = [
    {
        id: 'aaaaaaaa-0000-0000-0000-aaaaaaaa0001',
        name: 'smartphone',
    },
    {
        id: 'aaaaaaaa-0000-0000-0000-aaaaaaaa0002',
        name: 'monitor',
    },
    {
        id: 'aaaaaaaa-0000-0000-0000-aaaaaaaa0003',
        name: 'keyboard',
    },
    {
        id: 'aaaaaaaa-0000-0000-0000-aaaaaaaa0004',
        name: 'mouse',
    },
];
let CategorySeed = class CategorySeed {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async seedCategory() {
        for (const element of exports.categorySeed) {
            const existCategory = await this.categoryRepository.findOneBy({
                name: element.name,
            });
            if (existCategory)
                continue;
            const saveCategory = await this.categoryRepository.save(element);
        }
        const findCategory = await this.categoryRepository.find({ take: 1 });
        console.log("Cagegories Seeder successfull!!!");
        return findCategory;
    }
};
exports.CategorySeed = CategorySeed;
exports.CategorySeed = CategorySeed = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.CategoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategorySeed);
//# sourceMappingURL=category.seed.js.map