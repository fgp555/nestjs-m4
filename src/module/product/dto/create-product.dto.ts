import { CategoryEntity } from 'src/module/category/entities/category.entity';

export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
  imgUrl?: string;
  category: string;
}
