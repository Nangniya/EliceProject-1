import { ApiProperty } from '@nestjs/swagger';

export class userCartDto {
  @ApiProperty({
    example: '1092012890',
    description: 'productId',
  })
  productId: string;

  @ApiProperty({
    example: 100,
    description: 'productQuantity',
  })
  quantity: number;
}
