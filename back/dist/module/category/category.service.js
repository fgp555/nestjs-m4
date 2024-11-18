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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("./entities/category.entity");
const typeorm_2 = require("typeorm");
let CategoryService = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async create(createCategoryDto) {
        const findName = await this.categoryRepository.findOneBy({
            name: createCategoryDto.name,
        });
        if (findName) {
            throw new common_1.ConflictException(`La categoría ${createCategoryDto.name} ya existe.`);
        }
        try {
            return await this.categoryRepository.save(createCategoryDto);
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al crear la categoría. Por favor, verifica los datos enviados.');
        }
    }
    async findAll() {
        try {
            return await this.categoryRepository.find({
                order: {
                    id: 'ASC',
                },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al intentar obtener las categorías. Por favor, intenta más tarde.');
        }
    }
    async findOne(id) {
        const category = await this.categoryRepository.findOneBy({ id });
        if (!category) {
            throw new common_1.NotFoundException(`Categoría con ID "${id}" no encontrada.`);
        }
        return category;
    }
    async update(id, updateCategoryDto) {
        const category = await this.findOne(id);
        if (!category) {
            throw new common_1.NotFoundException(`Categoría con ID "${id}" no encontrada.`);
        }
        try {
            await this.categoryRepository.update(id, updateCategoryDto);
            return this.findOne(id);
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al actualizar la categoría. Por favor, verifica los datos enviados.');
        }
    }
    async remove(id) {
        await this.findOne(id);
        try {
            const result = await this.categoryRepository.delete(id);
            if (result.affected === 0) {
                throw new common_1.NotFoundException(`Categoría con ID "${id}" no encontrada.`);
            }
        }
        catch (error) {
            if (error.name === 'QueryFailedError' &&
                error.message.includes('violates foreign key constraint')) {
                throw new common_1.ConflictException(`No se puede eliminar la categoría porque está asociada a uno o más productos.`);
            }
            throw new common_1.BadRequestException('Ocurrió un error al intentar eliminar la categoría.');
        }
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.CategoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryService);
//# sourceMappingURL=category.service.js.map