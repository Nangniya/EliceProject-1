import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './orders.schema';
import { OrderRequestDto } from './dto/order.request.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async getAllOrder() {
    return await this.orderModel.find();
  }

  async findOrderListByUserId(userId: string) {
    const orders = await this.orderModel.find({ userId });
    return orders;
  }

  async findOrderByOrderId(orderId: string) {
    const order = await this.orderModel.findById(orderId);
    return order;
  }

  async createOrder(body: OrderRequestDto) {
    return await this.orderModel.create(body);
  }

  async updateDeliveryStatus(_id: string, deliveryStatus: string) {
    try {
      const order = await this.orderModel.findById(_id);
      order.deliveryStatus = deliveryStatus;
      return order.save();
    } catch (error) {
      throw new HttpException('db error 해당 하는 주문 ID 없음', 400);
    }
  }

  async deleteOrder(_id: string) {
    return await this.orderModel.findOneAndDelete({ _id });
  }
}
