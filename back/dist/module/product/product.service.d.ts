import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../category/entities/category.entity';
export declare class ProductService {
    private readonly productRepository;
    private readonly categoryRepository;
    constructor(productRepository: Repository<ProductEntity>, categoryRepository: Repository<CategoryEntity>);
    create(createProductDto: CreateProductDto): Promise<ProductEntity>;
    findAll(page: number, limit: number): Promise<ProductEntity[]>;
    findOne(id: string): Promise<ProductEntity>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<ProductEntity>;
    updateImage(productId: string, secure_url: string): Promise<ProductEntity>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    removeAll(): Promise<import("typeorm").DeleteResult>;
    seedProduct(): Promise<void>;
}
