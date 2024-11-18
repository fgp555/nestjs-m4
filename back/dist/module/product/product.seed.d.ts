import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from '../category/entities/category.entity';
export declare class ProductSeed {
    private readonly productRepository;
    private readonly categoryRepository;
    constructor(productRepository: Repository<ProductEntity>, categoryRepository: Repository<CategoryEntity>);
    seedProduct(): Promise<void>;
}
