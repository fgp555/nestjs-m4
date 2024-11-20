import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<CategoryEntity>);
    create(createCategoryDto: CreateCategoryDto): Promise<CreateCategoryDto & CategoryEntity>;
    findAll(): Promise<CategoryEntity[]>;
    findOne(id: string): Promise<CategoryEntity>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity>;
    remove(id: string): Promise<void>;
}
