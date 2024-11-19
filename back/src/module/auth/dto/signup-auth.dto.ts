import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
  ValidationArguments,
} from 'class-validator';

export class SigUpAuthDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(80, { message: 'El nombre no debe superar los 80 caracteres' })
  @ApiProperty({
    description: 'User name description',
    example: 'User 1',
  })
  name: string;

  @IsNotEmpty({ message: 'El correo electrónico es requerido' })
  @IsEmail(
    {},
    { message: 'El correo electrónico debe tener una estructura válida' },
  )
  @ApiProperty({
    description: 'User email description',
    example: 'User123s@gmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(15, { message: 'La contraseña no debe superar los 15 caracteres' })
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
    message:
      'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
  })
  @ApiProperty({
    description: 'User password description',
    example: 'User123s@',
  })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'La confirmación de la contraseña es requerida' })
  @ValidateIf((dto: SigUpAuthDto) => dto.password === dto.confirmPassword, {
    message: 'Las contraseñas no coinciden',
  })
  @ApiProperty({
    description: 'User password description',
    example: 'User123s@',
  })
  confirmPassword: string;

  @IsNumber({}, { message: 'El número de teléfono debe ser un número' })
  @IsNotEmpty({ message: 'El número de teléfono es requerido' })
  @ApiProperty({
    description: 'User phone description',
    example: '123456789',
  })
  phone: number;

  @IsString()
  @IsNotEmpty({ message: 'El país es requerido' })
  @MinLength(4, { message: 'El país debe tener al menos 4 caracteres' })
  @MaxLength(20, { message: 'El país no debe superar los 20 caracteres' })
  @ApiProperty({
    description: 'User country description',
    example: 'Perú',
  })
  country: string;
  

  @IsString()
  @IsNotEmpty({ message: 'La dirección es requerida' })
  @MinLength(3, { message: 'La dirección debe tener al menos 3 caracteres' })
  @MaxLength(80, { message: 'La dirección no debe superar los 80 caracteres' })
  @ApiProperty({
    description: 'User address description',
    example: 'Calle 123',
  })
  address: string;

  @IsString()
  @IsNotEmpty({ message: 'La ciudad es requerida' })
  @MinLength(4, { message: 'La ciudad debe tener al menos 4 caracteres' })
  @MaxLength(20, { message: 'La ciudad no debe superar los 20 caracteres' })
  @ApiProperty({
    description: 'User city description',
    example: 'Juliaca',
  })
  city: string;

  @IsEmpty()
  @IsOptional()
  isAdmin?: boolean;
}
