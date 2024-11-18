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
exports.FileController = void 0;
const common_1 = require("@nestjs/common");
const file_service_1 = require("./file.service");
const platform_express_1 = require("@nestjs/platform-express");
const product_service_1 = require("../product/product.service");
const auth_guard_1 = require("../auth/auth.guard");
const ImageValidatorPipe_1 = require("./pipes/ImageValidatorPipe");
let FileController = class FileController {
    constructor(fileService, productService) {
        this.fileService = fileService;
        this.productService = productService;
    }
    async updateImage(productId, file123) {
        const cloudinaryResult = await this.fileService.cloudinary(file123);
        const updateImage = await this.productService.updateImage(productId, cloudinaryResult.secure_url);
        return updateImage;
    }
    async uploadBasic(productId, file) {
        if (!file) {
            throw new common_1.BadRequestException('No se recibió ningún archivo.');
        }
        const cloudinaryResult = await this.fileService.cloudinary(file);
        const updateImage = await this.productService.updateImage(productId, cloudinaryResult.secure_url);
        return updateImage;
    }
    test(file123) {
        return file123;
    }
};
exports.FileController = FileController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, common_1.Post)('uploadImage/:productId'),
    __param(0, (0, common_1.Param)('productId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({
                maxSize: 1024 * 1024 * 5,
                message: 'El archivo debe pesar menos de 5MB',
            }),
            new common_1.FileTypeValidator({
                fileType: 'image/*',
            }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "updateImage", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, common_1.Post)('uploadBasic/:productId'),
    (0, common_1.UsePipes)(ImageValidatorPipe_1.ImageValidatorPipe),
    __param(0, (0, common_1.Param)('productId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "uploadBasic", null);
__decorate([
    (0, common_1.Post)('test'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileController.prototype, "test", null);
exports.FileController = FileController = __decorate([
    (0, common_1.Controller)('file'),
    __metadata("design:paramtypes", [file_service_1.FileService,
        product_service_1.ProductService])
], FileController);
//# sourceMappingURL=file.controller.js.map