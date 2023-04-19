import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { OrderRequestDto } from './dto/order.request.dto';
import { userIdDto } from 'src/users/dto/user.dto';
import { orderIdDto } from './dto/order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'user의 주문 리스트 가져오기' })
  @Post('getByuserId')
  async getUserOrderList(@Body() body: userIdDto) {
    return await this.ordersService.getOrderList(body.id);
  }

  @ApiOperation({ summary: '해당 주문 1개 가져오기' })
  @ApiBody({
    description: 'body: any',
  })
  @Post('getByOrderId')
  async getUserOrderInfo(@Body() body: orderIdDto) {
    return await this.ordersService.getOrder(body.id);
  }

  @ApiOperation({ summary: '주문 하기' })
  @Post()
  async orderRequest(@Body() body: OrderRequestDto) {
    return await this.ordersService.orderRequest(body);
  }
}
