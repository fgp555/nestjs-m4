import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../category/entities/category.entity';
import * as productSeed from '../../seed/data/products-seeder.json';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const foundCategory = await this.categoryRepository.findOneBy({
        name: createProductDto.category,
      });

      if (!foundCategory) {
        throw new NotFoundException(
          `Categoría "${createProductDto.category}" no encontrada`,
        );
      }

      const product = this.productRepository.create({
        ...createProductDto,
        category: foundCategory,
      });

      return await this.productRepository.save(product);
    } catch (error) {
      throw new BadRequestException('Error al crear el producto');
    }
  }

  async findAll(page: number, limit: number) {
    if (page < 1 || limit < 1) {
      throw new BadRequestException(
        'Los parámetros de paginación deben ser mayores a 0',
      );
    }

    const skip = (page - 1) * limit;

    try {
      return await this.productRepository.find({
        skip: skip,
        take: limit,
        order: { id: 'ASC' },
      });
    } catch (error) {
      throw new BadRequestException('Error al obtener los productos');
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.productRepository.findOneBy({ id });

      if (!product) {
        throw new NotFoundException(`Producto con ID "${id}" no encontrado`);
      }

      return product;
    } catch (error) {
      throw new BadRequestException(
        'Error al intentar obtener el producto por ID',
      );
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);

    const foundCategory = await this.categoryRepository.findOneBy({
      name: updateProductDto.category,
    });

    if (!foundCategory) {
      throw new NotFoundException(
        `Categoría "${updateProductDto.category}" no encontrada`,
      );
    }

    try {
      const updatedProduct = this.productRepository.merge(product, {
        ...updateProductDto,
        category: foundCategory,
      });

      return await this.productRepository.save(updatedProduct);
    } catch (error) {
      throw new BadRequestException('Error al actualizar el producto');
    }
  }

  async remove(id: string) {
    await this.findOne(id);

    try {
      const result = await this.productRepository.delete(id);

      if (result.affected === 0) {
        throw new NotFoundException(`Producto con ID "${id}" no encontrado`);
      }

      return result;
    } catch (error) {
      throw new BadRequestException('Error al eliminar el producto');
    }
  }

  async removeAll() {
    try {
      return await this.productRepository.delete({});
    } catch (error) {
      throw new BadRequestException('Error al eliminar todos los productos');
    }
  }

  async seedProduct() {
    const existingProducts = await this.productRepository.find();
    if (existingProducts.length > 0) {
      throw new ConflictException('Los productos ya han sido cargados');
    }

    try {
      for (const element of productSeed) {
        const foundCategory = await this.categoryRepository.findOneBy({
          name: element.category,
        });

        if (!foundCategory) {
          throw new NotFoundException(
            `Categoría "${element.category}" no encontrada para el producto "${element.name}"`,
          );
        }

        await this.productRepository.save({
          ...element,
          category: foundCategory,
        });
      }

      console.log('Productos cargados exitosamente');
    } catch (error) {
      throw new BadRequestException(
        'Error al realizar el seeding de productos',
      );
    }
  }
}
