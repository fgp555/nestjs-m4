import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  stock: number;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  imgUrl?: string;

  @IsString()
  category: string;
}
