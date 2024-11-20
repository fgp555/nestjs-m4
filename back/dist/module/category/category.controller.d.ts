import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategorySeed } from './category.seed';
export declare class CategoryController {
    private readonly categoryService;
    private readonly categorySeed;
    constructor(categoryService: CategoryService, categorySeed: CategorySeed);
    seeder(): Promise<import("./entities/category.entity").CategoryEntity[]>;
    create(createCategoryDto: CreateCategoryDto): Promise<CreateCategoryDto & import("./entities/category.entity").CategoryEntity>;
    findAll(): Promise<import("./entities/category.entity").CategoryEntity[]>;
    findOne(id: string): Promise<import("./entities/category.entity").CategoryEntity>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<import("./entities/category.entity").CategoryEntity>;
    remove(id: string): Promise<void>;
}
