import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { OrderRequestDto } from './dto/order.request.dto';
import { userIdDto } from 'src/users/dto/user.dto';
import { deliveryStatusDto, orderIdDto } from './dto/order.dto';

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
    type: orderIdDto,
    description: 'id는 orderid',
  })
  @Post('getByOrderId')
  async getUserOrderInfo(@Body() body: orderIdDto) {
    return await this.ordersService.getOrder(body.id);
  }

  @ApiOperation({ summary: '주문 하기' })
  @ApiBody({
    description: '주문하기',
    type: OrderRequestDto,
  })
  @Post()
  async orderRequest(@Body() body: OrderRequestDto) {
    return await this.ordersService.orderRequest(body);
  }

  @ApiOperation({ summary: '배송 상태 변경' })
  @ApiBody({
    type: deliveryStatusDto,
  })
  @Patch('delivery/:id')
  async updateDeliveryStatus(
    @Body() body: deliveryStatusDto,
    @Param('id') id: string,
  ) {
    return await this.ordersService.updateDeliveryStatus(body, id);
  }

  @ApiOperation({ summary: '주문 취소 하기' })
  @Delete('id/:id')
  async deleteOrder(@Param('id') id: string) {
    return await this.ordersService.deleteOrder(id);
  }

  @ApiOperation({ summary: '전체 주문 가져오기' })
  @Get()
  async getAllOrder() {
    return await this.ordersService.getAllOrder();
  }
}
