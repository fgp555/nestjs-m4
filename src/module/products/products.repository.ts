import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsRepository {
  private products = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      stock: true,
      imgUrl: 'https://picsum.photos/200/300',
    },
  ];

  findAll() {
    return this.products;
  }
}
