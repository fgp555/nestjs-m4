import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/decorator/roles.decorator';
import { RolesEnum } from 'src/roles/enum/roles.enum';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
  ): Promise<UserEntity[]> {
    return this.userService.findAll(page, limit);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'The UUID of the product to update',
    schema: {
      type: 'string',
      format: 'uuid',
      example: 'ffffffff-0000-0000-0000-ffffffff0001',
    },
  })
  @Get(':id')
  @ApiBearerAuth()
  @Roles(RolesEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'The UUID of the product to update',
    schema: {
      type: 'string',
      format: 'uuid',
      example: 'ffffffff-0000-0000-0000-ffffffff0001',
    },
  })
  @Patch(':id')
  @ApiBearerAuth()
  @Roles(RolesEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userService.update(id, updateUserDto);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'The UUID of the product to update',
    schema: {
      type: 'string',
      format: 'uuid',
      example: 'ffffffff-0000-0000-0000-ffffffff0001',
    },
  })
  @Delete(':id')
  @ApiBearerAuth()
  @Roles(RolesEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    return this.userService.remove(id);
  }
}
