import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategorySeed } from './category.seed';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/roles/enum/roles.enum';
import { Roles } from 'src/roles/decorator/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categorySeed: CategorySeed,
  ) {}

  @Post('seeder')
  @ApiBearerAuth()
  @Roles(RolesEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  seeder() {
    return this.categorySeed.seedCategory();
  }

  @Post()
  @ApiBearerAuth()
  @Roles(RolesEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'The UUID of the product to update',
    schema: {
      type: 'string',
      format: 'uuid',
      example: 'aaaaaaaa-0000-0000-0000-aaaaaaaa0004',
    },
  })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoryService.findOne(id);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'The UUID of the product to update',
    schema: {
      type: 'string',
      format: 'uuid',
      example: 'aaaaaaaa-0000-0000-0000-aaaaaaaa0004',
    },
  })
  @Patch(':id')
  @ApiBearerAuth()
  @Roles(RolesEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'The UUID of the product to update',
    schema: {
      type: 'string',
      format: 'uuid',
      example: 'aaaaaaaa-0000-0000-0000-aaaaaaaa0004',
    },
  })
  @Delete(':id')
  @ApiBearerAuth()
  @Roles(RolesEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoryService.remove(id);
  }
}
