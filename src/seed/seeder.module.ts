import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorySeed } from 'src/module/category/category.seed';
import { CategoryEntity } from 'src/module/category/entities/category.entity';
import { ProductEntity } from 'src/module/product/entities/product.entity';
import { ProductSeed } from 'src/module/product/product.seed';
import { UserEntity } from 'src/module/user/entities/user.entity';
import { UserSeeder } from 'src/module/user/user.seeder';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, ProductEntity, UserEntity]),
  ],
  providers: [CategorySeed, ProductSeed, UserSeeder],
})
export class SeederModule {
  constructor(
    private readonly categorySeed: CategorySeed,
    private readonly productSeed: ProductSeed,
    private readonly userSeeder: UserSeeder,
  ) {
    // console.log('SeederModule');
    this.seed();
  }

  private async seed() {
    await this.categorySeed.seedCategory();
    await this.productSeed.seedProduct();
    await this.userSeeder.seed();
  }
}
