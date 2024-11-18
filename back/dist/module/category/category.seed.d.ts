import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
export declare const categorySeed: Partial<CategoryEntity>[];
export declare class CategorySeed {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<CategoryEntity>);
    seedCategory(): Promise<CategoryEntity[]>;
}
