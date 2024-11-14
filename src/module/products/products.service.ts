import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { IProduct } from './entities/products.interface';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  create(product: Omit<IProduct, 'id'>) {
    return this.productsRepository.create(product);
  }

  findAll(page: number, limit: number) {
    return this.productsRepository.findAll(page, limit);
  }

  findOne(id: number) {
    return this.productsRepository.findOne(id);
  }

  update(id: number, product: Omit<IProduct, 'id'>) {
    return this.productsRepository.update(id, product);
  }

  remove(id: number) {
    return this.productsRepository.remove(id);
  }
}
