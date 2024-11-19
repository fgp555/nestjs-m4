// update-user.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { SigUpAuthDto } from 'src/module/auth/dto/signup-auth.dto';

// export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class UpdateUserDto extends SigUpAuthDto {}
