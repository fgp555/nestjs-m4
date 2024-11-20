"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninAuthDto = void 0;
const signup_auth_dto_1 = require("./signup-auth.dto");
const swagger_1 = require("@nestjs/swagger");
class SigninAuthDto extends (0, swagger_1.PickType)(signup_auth_dto_1.SigUpAuthDto, [
    'email',
    'password',
]) {
}
exports.SigninAuthDto = SigninAuthDto;
//# sourceMappingURL=signin-auth.dto.js.map