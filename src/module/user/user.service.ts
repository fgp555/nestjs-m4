import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SigninAuthDto } from '../auth/dto/signin-auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    try {
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException('Error al crear el usuario');
    }
  }

  async findAll(page: number, limit: number): Promise<UserEntity[]> {
    if (page < 1 || limit < 1) {
      throw new BadRequestException(
        'Los parámetros de paginación deben ser mayores a 0',
      );
    }

    const skip = (page - 1) * limit;

    try {
      return await this.userRepository.find({
        skip: skip,
        take: limit,
        order: { id: 'ASC' },
        select: [
          'id',
          'name',
          'email',
          'phone',
          'country',
          'address',
          'city',
          'isAdmin',
        ], // Seleccionar campos explícitos
      });
    } catch (error) {
      throw new BadRequestException('Error al obtener los usuarios');
    }
  }

  async findOne(id: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`Usuario con id ${id} no encontrado`);
      }
      return user;
    } catch (error) {
      throw new BadRequestException(
        'Error al intentar buscar el usuario por ID',
      );
    }
  }

  async findByEmail(signin: SigninAuthDto): Promise<UserEntity | null> {
    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email: signin.email })
      .getOne();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.findOne(id);

    try {
      await this.userRepository.update(id, updateUserDto);
      return await this.findOne(id);
    } catch (error) {
      throw new BadRequestException('Error al actualizar el usuario');
    }
  }

  async remove(id: string): Promise<UserEntity> {
    const user = await this.findOne(id);

    try {
      return await this.userRepository.remove(user);
    } catch (error) {
      throw new BadRequestException(
        'Error al intentar eliminar el usuario. Verifica las dependencias.',
      );
    }
  }
}
