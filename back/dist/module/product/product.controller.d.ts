import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    seeder(): Promise<void>;
    create(createProductDto: CreateProductDto): Promise<import("./entities/product.entity").ProductEntity>;
    findAll(page?: number, limit?: number): Promise<import("./entities/product.entity").ProductEntity[]>;
    findOne(id: string): Promise<import("./entities/product.entity").ProductEntity>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("./entities/product.entity").ProductEntity>;
    removeAll(): Promise<import("typeorm").DeleteResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
