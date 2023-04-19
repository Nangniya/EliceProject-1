import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../users.schema';

export class ReadOnlyUserDto extends PickType(User, [
  'email',
  'name',
] as const) {
  @ApiProperty({
    example: '643e1ada43da3cb65097f989',
    description: 'id',
  })
  id: string;
}

export class userIdDto {
  @ApiProperty({
    example: '643e1ada43da3cb65097f989',
    description: 'id',
  })
  id: string;
}
