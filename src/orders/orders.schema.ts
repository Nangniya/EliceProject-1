import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';
import { orderedProductDto } from './dto/orders.orderedProducts';

const options: SchemaOptions = {
  collection: 'orders',
  //스키마에 대한 옵션 db에서 하나가 만들어 질 때 timestamps를 하나 찍어준다.
  timestamps: true,
};

@Schema(options)
export class Order extends Document {
  @ApiProperty({
    example: '643e1ada43da3cb65097f989',
    description: 'userId',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: '배송 진행 중',
    description: 'deliveryStatus',
    required: true,
  })
  @Prop({
    default: '주문 진행 중',
  })
  @IsString()
  @IsNotEmpty()
  deliveryStatus: string;

  @ApiProperty({
    example: '대전 가양동',
    description: 'address',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: '010-0000-0000',
    description: 'phoneNum',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  phoneNum: string;

  @ApiProperty({
    example: 'kim',
    description: 'receiver',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  receiver: string;

  @ApiProperty({
    example: 'safe please',
    description: 'deliveryMessage',
    required: true,
  })
  @Prop({
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  deliveryMessage: string;

  @ApiProperty({
    example: [{ productId: '643e4d7dcd5d39e480d32032', quantity: 10 }],
    description: 'order',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  orderedProducts: orderedProductDto[];

  @ApiProperty({
    example: 10000,
    description: 'price',
  })
  @Prop({
    required: true,
  })
  price: number;
}

export const _OrdersSchema = SchemaFactory.createForClass(Order);

_OrdersSchema.virtual('readOnlyData').get(function (this: Order) {
  return {
    id: this.id,
    userId: this.userId,
    deliveryStatus: this.deliveryStatus,
    orderedProducts: this.orderedProducts,
    address: this.address,
    phoneNum: this.phoneNum,
    receiver: this.receiver,
    deliveryMessage: this.deliveryMessage,
    price: this.price,
  };
});

export const OrdersSchema = _OrdersSchema;
