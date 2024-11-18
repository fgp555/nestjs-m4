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
exports.SigUpAuthDto = void 0;
const class_validator_1 = require("class-validator");
class SigUpAuthDto {
}
exports.SigUpAuthDto = SigUpAuthDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre es requerido' }),
    (0, class_validator_1.MinLength)(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
    (0, class_validator_1.MaxLength)(80, { message: 'El nombre no debe superar los 80 caracteres' }),
    __metadata("design:type", String)
], SigUpAuthDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El correo electrónico es requerido' }),
    (0, class_validator_1.IsEmail)({}, { message: 'El correo electrónico debe tener una estructura válida' }),
    __metadata("design:type", String)
], SigUpAuthDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'La contraseña es requerida' }),
    (0, class_validator_1.MinLength)(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    (0, class_validator_1.MaxLength)(15, { message: 'La contraseña no debe superar los 15 caracteres' }),
    (0, class_validator_1.Matches)(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
        message: 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
    }),
    __metadata("design:type", String)
], SigUpAuthDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'La confirmación de la contraseña es requerida' }),
    (0, class_validator_1.ValidateIf)((dto) => dto.password === dto.confirmPassword, {
        message: 'Las contraseñas no coinciden',
    }),
    __metadata("design:type", String)
], SigUpAuthDto.prototype, "confirmPassword", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'El número de teléfono debe ser un número' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El número de teléfono es requerido' }),
    __metadata("design:type", Number)
], SigUpAuthDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El país es requerido' }),
    (0, class_validator_1.MinLength)(4, { message: 'El país debe tener al menos 4 caracteres' }),
    (0, class_validator_1.MaxLength)(20, { message: 'El país no debe superar los 20 caracteres' }),
    __metadata("design:type", String)
], SigUpAuthDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'La dirección es requerida' }),
    (0, class_validator_1.MinLength)(3, { message: 'La dirección debe tener al menos 3 caracteres' }),
    (0, class_validator_1.MaxLength)(80, { message: 'La dirección no debe superar los 80 caracteres' }),
    __metadata("design:type", String)
], SigUpAuthDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'La ciudad es requerida' }),
    (0, class_validator_1.MinLength)(4, { message: 'La ciudad debe tener al menos 4 caracteres' }),
    (0, class_validator_1.MaxLength)(20, { message: 'La ciudad no debe superar los 20 caracteres' }),
    __metadata("design:type", String)
], SigUpAuthDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], SigUpAuthDto.prototype, "isAdmin", void 0);
//# sourceMappingURL=signup-auth.dto.js.map