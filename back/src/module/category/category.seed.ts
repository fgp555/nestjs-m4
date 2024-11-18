import { Injectable } from '@nestjs/common';
import { CategoryEntity } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export const categorySeed: Partial<CategoryEntity>[] = [
  {
    id: 'aaaaaaaa-0000-0000-0000-aaaaaaaa0001',
    name: 'smartphone',
  },
  {
    id: 'aaaaaaaa-0000-0000-0000-aaaaaaaa0002',
    name: 'monitor',
  },
  {
    id: 'aaaaaaaa-0000-0000-0000-aaaaaaaa0003',
    name: 'keyboard',
  },
  {
    id: 'aaaaaaaa-0000-0000-0000-aaaaaaaa0004',
    name: 'mouse',
  },
];

@Injectable()
export class CategorySeed {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async seedCategory() {
    for (const element of categorySeed) {
      const existCategory = await this.categoryRepository.findOneBy({
        name: element.name,
      });
      // if (existCategory) throw new Error('category already exist');
      if (existCategory) continue;

      const saveCategory = await this.categoryRepository.save(element);

      // console.log('saveCategory', saveCategory);
    }

    const findCategory = await this.categoryRepository.find({ take: 1 });
    // console.log('findCategory', findCategory);
    console.log("Cagegories Seeder successfull!!!")
    return findCategory;
  }
}
