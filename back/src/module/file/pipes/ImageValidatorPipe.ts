import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ImageValidatorPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const maxSize = 200 * 1024; // 200 KB en bytes

    if (value.size > maxSize) {
      throw new BadRequestException(
        'El tamaño de la imagen no debe superar los 200 KB',
      );
    }

    return value;
  }
}
