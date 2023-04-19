import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrdersSchema } from './orders.schema';
import { OrdersRepository } from './orders.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrdersSchema }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
