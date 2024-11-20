"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSystemDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_system_dto_1 = require("./create-system.dto");
class UpdateSystemDto extends (0, mapped_types_1.PartialType)(create_system_dto_1.CreateSystemDto) {
}
exports.UpdateSystemDto = UpdateSystemDto;
//# sourceMappingURL=update-system.dto.js.map