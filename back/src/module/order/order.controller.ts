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
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/roles/enum/roles.enum';
import { Roles } from 'src/roles/decorator/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiBearerAuth()
  // @Roles(RolesEnum.Admin)
  // @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @ApiBearerAuth()
  // @Roles(RolesEnum.Admin)
  // @UseGuards(AuthGuard, RolesGuard)
  findAll() {
    return this.orderService.findAll();
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'The UUID of the product to update',
    schema: {
      type: 'string',
      format: 'uuid',
      example: '123e4567-e89b-12d3-a456-426614174000',
    },
  })
  @Get(':id')
  @ApiBearerAuth()
  @Roles(RolesEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderService.findOne(id);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'The UUID of the product to update',
    schema: {
      type: 'string',
      format: 'uuid',
      example: '123e4567-e89b-12d3-a456-426614174000',
    },
  })
  @Patch(':id')
  @ApiBearerAuth()
  @Roles(RolesEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(id, updateOrderDto);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'The UUID of the product to update',
    schema: {
      type: 'string',
      format: 'uuid',
      example: '123e4567-e89b-12d3-a456-426614174000',
    },
  })
  @Delete(':id')
  @ApiBearerAuth()
  @Roles(RolesEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderService.remove(id);
  }
}
