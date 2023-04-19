import { HttpException, Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { OrderRequestDto } from './dto/order.request.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async getOrderList(userId: string) {
    const orders = await this.ordersRepository.findOrderListByUserId(userId);
    if (orders) {
      return orders;
    } else {
      throw new HttpException(
        '해당 유저에 일치하는 주문은 존재하지 않습니다.',
        500,
      );
    }
  }

  async getOrder(orderId: string) {
    const order = await this.ordersRepository.findOrderByOrderId(orderId);
    if (order) {
      return order;
    } else {
      throw new HttpException('해당하는 주문번호는 존재하지 않습니다.', 500);
    }
  }

  async orderRequest(body: OrderRequestDto) {
    const order = await this.ordersRepository.createOrder(body);
    if (order) {
      return '주문을 완료 했습니다.';
    } else {
      throw new HttpException('validation 형식이 올바르지 않습니다.', 500);
    }
  }
}
