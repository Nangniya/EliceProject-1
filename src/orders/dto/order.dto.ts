import { ApiProperty } from '@nestjs/swagger';

export class orderIdDto {
  @ApiProperty({
    example: '643f9dd9e8b6e97170c7529e',
    description: 'order id',
  })
  id: string;
}
