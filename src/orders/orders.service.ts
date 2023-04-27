import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { OrderRequestDto } from './dto/order.request.dto';
import { deliveryStatusDto } from './dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async getOrderList(userId: string) {
    const orders = await this.ordersRepository.findOrderListByUserId(userId);
    if (orders) {
      return orders;
    } else {
      throw new UnauthorizedException(
        '해당 유저에 일치하는 주문은 존재하지 않습니다.',
      );
    }
  }

  async getOrder(orderId: string) {
    const order = await this.ordersRepository.findOrderByOrderId(orderId);
    if (order) {
      return order;
    } else {
      throw new UnauthorizedException('해당하는 주문번호는 존재하지 않습니다.');
    }
  }

  async orderRequest(body: OrderRequestDto) {
    const order = await this.ordersRepository.createOrder(body);
    if (order) {
      return order;
    } else {
      throw new UnauthorizedException('validation 형식이 올바르지 않습니다.');
    }
  }
  async updateDeliveryStatus(body: deliveryStatusDto, id: string) {
    const order = await this.ordersRepository.updateDeliveryStatus(
      id,
      body.deliveryStatus,
    );
    if (order) {
      return order;
    } else {
      throw new UnauthorizedException('해당하는 주문이 없습니다.');
    }
  }

  async deleteOrder(id: string) {
    const deletedOrder = await this.ordersRepository.deleteOrder(id);
    if (deletedOrder) {
      return deletedOrder;
    } else {
      throw new UnauthorizedException(
        '해당 제품은 이미 삭제되 었거나, 존재하지 않습니다.',
      );
    }
  }

  async getAllOrder() {
    return await this.ordersRepository.getAllOrder();
  }
}
