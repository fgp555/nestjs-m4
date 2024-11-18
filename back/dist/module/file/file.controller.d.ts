import { FileService } from './file.service';
import { ProductService } from '../product/product.service';
export declare class FileController {
    private readonly fileService;
    private readonly productService;
    constructor(fileService: FileService, productService: ProductService);
    updateImage(productId: string, file123: Express.Multer.File): Promise<import("../product/entities/product.entity").ProductEntity>;
    uploadBasic(productId: string, file: Express.Multer.File): Promise<import("../product/entities/product.entity").ProductEntity>;
    test(file123: Express.Multer.File): Express.Multer.File;
}
