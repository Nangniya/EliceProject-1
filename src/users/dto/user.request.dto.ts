import { PickType } from '@nestjs/swagger';
import { User } from '../users.schema';

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
