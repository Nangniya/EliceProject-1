import { PickType } from '@nestjs/swagger';
import { Category } from '../categories.schema';

export class categoryRequestDto extends PickType(Category, ['name'] as const) {}
