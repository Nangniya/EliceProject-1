import { ApiProperty, PickType } from '@nestjs/swagger';
import { Order } from '../orders.schema';

export class orderIdDto {
  @ApiProperty({
    example: '643f9dd9e8b6e97170c7529e',
    description: 'order id',
  })
  id: string;
}

export class deliveryStatusDto extends PickType(Order, [
  'deliveryStatus',
] as const) {
  @ApiProperty({
    example: '643f9dd9e8b6e97170c7529e',
    description: 'order id',
  })
  id: string;
}
