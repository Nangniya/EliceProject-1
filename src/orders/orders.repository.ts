import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './orders.schema';
import { OrderRequestDto } from './dto/order.request.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async findOrderListByUserId(userId: string) {
    const orders = await this.orderModel.find({ userId });
    return orders;
  }

  async findOrderByOrderId(orderId: string) {
    console.log(orderId);
    const order = await this.orderModel.findById(orderId);
    console.log(order);
    return order;
  }

  async createOrder(body: OrderRequestDto) {
    return await this.orderModel.create(body);
  }
}
