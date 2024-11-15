import {
  Controller,
  Post,
  Param,
  UploadedFile,
  UseInterceptors,
  ParseUUIDPipe,
  UseGuards,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UsePipes,
  BadRequestException,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from '../product/product.service';
import { AuthGuard } from '../auth/auth.guard';
import { ImageValidatorPipe } from './pipes/ImageValidatorPipe';

@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly productService: ProductService,
  ) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('uploadImage/:productId')
  async updateImage(
    @Param('productId', ParseUUIDPipe) productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 5,
            message: 'El archivo debe pesar menos de 5MB',
          }),
          new FileTypeValidator({
            fileType: 'image/*',
            // fileType: /(jpeg|jpg|png|webp)$/,
          }),
        ],
      }),
    )
    file123: Express.Multer.File,
  ) {
    const cloudinaryResult = await this.fileService.cloudinary(file123);
    const updateImage = await this.productService.updateImage(
      productId,
      cloudinaryResult.secure_url,
    );
    return updateImage;
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('uploadBasic/:productId')
  @UsePipes(ImageValidatorPipe) // Aplicar el Pipe de validación
  async uploadBasic(
    @Param('productId', ParseUUIDPipe) productId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No se recibió ningún archivo.');
    }
    const cloudinaryResult = await this.fileService.cloudinary(file);
    const updateImage = await this.productService.updateImage(
      productId,
      cloudinaryResult.secure_url,
    );
    return updateImage;
  }

  @Post('test')
  @UseInterceptors(FileInterceptor('file'))
  test(@UploadedFile() file123: Express.Multer.File) {
    return file123;
  }
}
