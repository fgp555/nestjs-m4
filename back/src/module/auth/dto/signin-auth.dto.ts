import { SigUpAuthDto } from './signup-auth.dto';
import { PickType } from '@nestjs/swagger';

export class SigninAuthDto extends PickType(SigUpAuthDto, [
  'email',
  'password',
]) {}
