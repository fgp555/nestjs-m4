import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
  ArrayMinSize,
  IsOptional,
} from 'class-validator';

class ProductDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class CreateOrderDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'products must contain at least one product.' }) // Asegura que haya al menos un producto
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];
}
