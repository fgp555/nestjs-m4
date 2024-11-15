import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const findName = await this.categoryRepository.findOneBy({
      name: createCategoryDto.name,
    });

    if (findName) {
      throw new ConflictException(
        `La categoría ${createCategoryDto.name} ya existe.`,
      );
    }

    try {
      return await this.categoryRepository.save(createCategoryDto);
    } catch (error) {
      throw new BadRequestException(
        'Error al crear la categoría. Por favor, verifica los datos enviados.',
      );
    }
  }

  async findAll() {
    try {
      return await this.categoryRepository.find({
        order: {
          id: 'ASC',
        },
      });
    } catch (error) {
      throw new BadRequestException(
        'Error al intentar obtener las categorías. Por favor, intenta más tarde.',
      );
    }
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      throw new NotFoundException(`Categoría con ID "${id}" no encontrada.`);
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    if (!category) {
      throw new NotFoundException(`Categoría con ID "${id}" no encontrada.`);
    }

    try {
      await this.categoryRepository.update(id, updateCategoryDto);
      return this.findOne(id); // Devuelve la categoría actualizada.
    } catch (error) {
      throw new BadRequestException(
        'Error al actualizar la categoría. Por favor, verifica los datos enviados.',
      );
    }
  }

  async remove(id: string) {
    await this.findOne(id); // Lanza excepción si no encuentra la categoría.

    try {
      const result = await this.categoryRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Categoría con ID "${id}" no encontrada.`);
      }
    } catch (error) {
      if (
        error.name === 'QueryFailedError' &&
        error.message.includes('violates foreign key constraint')
      ) {
        throw new ConflictException(
          `No se puede eliminar la categoría porque está asociada a uno o más productos.`,
        );
      }
      throw new BadRequestException(
        'Ocurrió un error al intentar eliminar la categoría.',
      );
    }
  }
}
