import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class orderedProductDto {
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
