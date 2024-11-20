import { CategorySeed } from 'src/module/category/category.seed';
import { ProductSeed } from 'src/module/product/product.seed';
import { UserSeeder } from 'src/module/user/user.seeder';
export declare class SeederModule {
    private readonly categorySeed;
    private readonly productSeed;
    private readonly userSeeder;
    constructor(categorySeed: CategorySeed, productSeed: ProductSeed, userSeeder: UserSeeder);
    private seed;
}
