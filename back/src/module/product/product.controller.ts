import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from 'src/roles/decorator/roles.decorator';
import { RolesEnum } from 'src/roles/enum/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBearerAuth()
  @Roles(RolesEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('seeder')
  seeder() {
    return this.productService.seedProduct();
  }

  @Post()
  @ApiBearerAuth()
  @Roles(RolesEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiBearerAuth()
  @Roles(RolesEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of elements per page',
    schema: { default: 20 },
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
    schema: { default: 1 },
  })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
    //
  ) {
    return this.productService.findAll(page, limit);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'The UUID of the product to update',
    schema: {
      type: 'string',
      format: 'uuid',
      example: 'bbbbbbbb-0000-0000-0000-bbbbbbbb0002',
    },
  })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The UUID of the product to update',
    schema: {
      type: 'string',
      format: 'uuid',
      example: 'bbbbbbbb-0000-0000-0000-bbbbbbbb0002',
    },
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @ApiExcludeEndpoint()
  @Delete('all')
  @ApiBearerAuth()
  @Roles(RolesEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  removeAll() {
    return this.productService.removeAll();
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'The UUID of the product to update',
    schema: {
      type: 'string',
      format: 'uuid',
      example: 'bbbbbbbb-0000-0000-0000-bbbbbbbb0002',
    },
  })
  @Delete(':id')
  @ApiBearerAuth()
  @Roles(RolesEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.remove(id);
  }
}
