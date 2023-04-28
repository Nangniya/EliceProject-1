import { ApiProperty, PickType } from '@nestjs/swagger';
import { Products } from '../products.schema';

export class productIdDto {
  @ApiProperty({
    example: '643e4d7dcd5d39e480d32032',
    description: 'product id',
  })
  id: string;
}

export class categoryDto extends PickType(Products, ['category'] as const) {}

export class reviewDto extends PickType(Products, [
  'reviewCNT',
  'reviewAVG',
] as const) {
  @ApiProperty({
    example: '이 상품은 매우 만족해요',
  })
  reviewcontent: string;
}
