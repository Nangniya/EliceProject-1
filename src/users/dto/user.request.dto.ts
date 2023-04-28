import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../users.schema';
import { IsNotEmpty } from 'class-validator';

export class UserRequestDto extends PickType(User, [
  'email',
  'name',
  'password',
  'address',
  'phoneNumber',
] as const) {}

export class UserUpdateDto extends PickType(User, [
  'name',
  'address',
  'phoneNumber',
] as const) {}

export class orderIdAddUserDto {
  @ApiProperty({
    example: '644a7eefa02e0edbbcde2222',
  })
  @IsNotEmpty()
  orderId: string;
}
