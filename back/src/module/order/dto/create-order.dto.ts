import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: 'bbbbbbbb-0000-0000-0000-bbbbbbbb0001',
    description: 'The id of the product',
  })
  id: string;
}

export class CreateOrderDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    example: "ffffffff-0000-0000-0000-ffffffff0001",
    description: 'The id of the user',
  })
  userId: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'products must contain at least one product.' }) // Asegura que haya al menos un producto
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];
}
