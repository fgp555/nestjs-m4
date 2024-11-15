import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCategoryDto {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsString()
  name: string;
}
