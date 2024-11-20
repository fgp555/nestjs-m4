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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        const existingUser = await this.userRepository.findOne({
            where: { email: createUserDto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('El email ya está registrado');
        }
        try {
            const user = this.userRepository.create(createUserDto);
            return await this.userRepository.save(user);
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al crear el usuario');
        }
    }
    async findAll(page, limit) {
        if (page < 1 || limit < 1) {
            throw new common_1.BadRequestException('Los parámetros de paginación deben ser mayores a 0');
        }
        const skip = (page - 1) * limit;
        try {
            return await this.userRepository.find({
                skip: skip,
                take: limit,
                order: { id: 'ASC' },
                select: [
                    'id',
                    'name',
                    'email',
                    'phone',
                    'country',
                    'address',
                    'city',
                    'isAdmin',
                ],
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al obtener los usuarios');
        }
    }
    async findOne(id) {
        try {
            const user = await this.userRepository.findOne({ where: { id } });
            if (!user) {
                throw new common_1.NotFoundException(`Usuario con id ${id} no encontrado`);
            }
            return user;
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al intentar buscar el usuario por ID');
        }
    }
    async findByEmail(signin) {
        return await this.userRepository
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email = :email', { email: signin.email })
            .getOne();
    }
    async update(id, updateUserDto) {
        await this.findOne(id);
        try {
            await this.userRepository.update(id, updateUserDto);
            return await this.findOne(id);
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al actualizar el usuario');
        }
    }
    async remove(id) {
        const user = await this.findOne(id);
        try {
            return await this.userRepository.remove(user);
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al intentar eliminar el usuario. Verifica las dependencias.');
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map