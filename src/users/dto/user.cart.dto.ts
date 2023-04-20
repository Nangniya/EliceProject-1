import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class userCartDto {
  @ApiProperty({
    example: '1092012890',
    description: 'productId',
  })
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty({
    example: 100,
    description: 'productQuantity',
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class addCartDto extends PickType(userCartDto, [
  'productId',
  'quantity',
] as const) {
  @ApiProperty({
    example: '643e1ada43da3cb65097f989',
    description: 'userId',
  })
  userId: string;
}
