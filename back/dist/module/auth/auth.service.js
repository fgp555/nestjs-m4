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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const roles_enum_1 = require("../../roles/enum/roles.enum");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async signup(signup) {
        if (signup.password !== signup.confirmPassword) {
            throw new common_1.BadRequestException('Las contraseñas no coinciden');
        }
        const hashedPassword = await bcrypt.hash(signup.password, 10);
        if (!hashedPassword) {
            throw new common_1.BadRequestException('Error al hashear la contraseña');
        }
        signup.password = hashedPassword;
        const createUser = await this.userService.create(signup);
        const { password, ...withoutPassword } = createUser;
        return withoutPassword;
    }
    async signin(signin) {
        const foundEmail = await this.userService.findByEmail(signin);
        if (!foundEmail)
            throw new common_1.UnauthorizedException('Email o contraseña incorrectos');
        const isPasswordValid = await bcrypt.compare(signin.password, foundEmail.password);
        if (!isPasswordValid)
            throw new common_1.UnauthorizedException('Email o contraseña incorrectos');
        const { password, ...withoutPassword } = foundEmail;
        const userPayload = {
            sub: foundEmail.id,
            id: foundEmail.id,
            email: foundEmail.email,
            roles: [foundEmail.isAdmin ? roles_enum_1.RolesEnum.Admin : roles_enum_1.RolesEnum.User],
        };
        console.log("userPayload", userPayload);
        const token = this.jwtService.sign(userPayload);
        return { token, user: withoutPassword };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map