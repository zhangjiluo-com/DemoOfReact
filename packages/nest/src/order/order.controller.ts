import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { OrderService } from './order.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Public } from 'src/shared/decorators/public.decorator'

@Public()
@ApiTags('订单')
@ApiHeader({ name: 'Authorization' })
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: '创建订单' })
  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto)
  }

  @ApiOperation({ summary: '查询所有订单' })
  @Get()
  getAll() {
    return this.orderService.findAll()
  }

  @ApiOperation({ summary: '查询订单详情' })
  @Get(':id')
  get(@Param('id') id: number) {
    return this.orderService.get(id)
  }

  @ApiOperation({ summary: '更新订单' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateOrderDto) {
    return this.orderService.update(id, dto)
  }

  @ApiOperation({ summary: '删除订单' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.orderService.remove(id)
  }
}
