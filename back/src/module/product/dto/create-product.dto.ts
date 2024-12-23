import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsUUID,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Min,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El nombre no debe superar los 100 caracteres' })
  @ApiProperty({
    description: 'Product name',
    example: 'New Product',
  })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'La descripción es requerida' })
  @MinLength(5, { message: 'La descripción debe tener al menos 5 caracteres' })
  @MaxLength(500, {
    message: 'La descripción no debe superar los 500 caracteres',
  })
  @ApiProperty({
    description: 'Product description ',
    example: 'This is a new product',
  })
  description: string;

  @IsNumber()
  @Min(0, { message: 'El stock debe ser al menos 0' })
  @ApiProperty({
    description: 'Product stock',
    example: 10,
  })
  stock: number;

  @IsNumber()
  @Min(0, { message: 'El precio debe ser al menos 0' })
  @ApiProperty({
    description: 'Product price',
    example: 1000,
  })
  price: number;

  @IsUrl({}, { message: 'La URL de la imagen debe ser válida' })
  @IsOptional()
  @ApiProperty({
    description: 'Product image url',
    example: 'https://example.com/image.png',
  })
  imgUrl?: string;

  @IsString()
  @IsNotEmpty({ message: 'La categoría es requerida' })
  @MinLength(3, { message: 'La categoría debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'La categoría no debe superar los 50 caracteres' })
  @ApiProperty({
    description: 'Product category',
    example: 'smartphone',
  })
  category: string;
}
