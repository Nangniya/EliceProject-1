import { PickType } from '@nestjs/swagger';
import { Products } from './products.schema';

export class ProductRequestDto extends PickType(Products, [
  'name',
  'quantity',
  'manufacture',
  'category',
  'price',
  'content',
] as const) {}
