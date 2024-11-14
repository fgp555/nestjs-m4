import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProduct } from './entities/products.interface';

@Injectable()
export class ProductsRepository {
  private products = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      stock: 1,
      imgUrl: 'https://picsum.photos/200/300',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description 2',
      price: 200,
      stock: 2,
      imgUrl: 'https://picsum.photos/200/300',
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description 3',
      price: 300,
      stock: 3,
      imgUrl: 'https://picsum.photos/200/300',
    },
  ];

  create(product: Omit<IProduct, 'id'>) {
    let id = this.products.length + 1;
    const newProduct = this.products.push({ id, ...product });
    return newProduct;
  }

  findAll(page: number, limit: number) {
    const start = (page - 1) * limit;
    const end = start + limit;
    const productSlice = this.products.slice(start, end);
    return productSlice;
  }

  findOne(id: number) {
    return this.products.filter((p) => p.id == id);
  }

  update(id: number, product: Omit<IProduct, 'id'>) {
    const findProduct = this.products.find((p) => p.id === id);
    if (findProduct) {
      const updateProduct = Object.assign(findProduct, product);
      return updateProduct.id;
    }
    return `Product no found`;
  }

  remove(id: number) {
    const productIndex = this.products.findIndex((p) => p.id == id);
    if (productIndex == -1) return 'Product no found';
    const [removedProduct] = this.products.splice(productIndex, 1);

    return removedProduct.id;
  }
}
