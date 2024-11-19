import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCategoryDto {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsString()
  @ApiProperty({
    example: 'Laptops',
    description: 'Name of the new category',
  })
  name: string;
}
