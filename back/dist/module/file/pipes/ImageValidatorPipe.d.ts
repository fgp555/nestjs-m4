import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ImageValidatorPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
