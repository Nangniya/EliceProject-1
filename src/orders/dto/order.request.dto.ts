import { PickType } from '@nestjs/swagger';
import { Order } from '../orders.schema';

export class OrderRequestDto extends PickType(Order, [
  'userId',
  'address',
  'phoneNum',
  'receiver',
  'deliveryMessage',
  'orderedProducts',
  'price',
] as const) {}
