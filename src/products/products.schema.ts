import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Document } from 'mongoose';
import { ProductReviewDto } from './dto/prodcut.review.dto';

const options: SchemaOptions = {
  collection: 'products',
  //스키마에 대한 옵션 db에서 하나가 만들어 질 때 timestamps를 하나 찍어준다.
  timestamps: true,
};

@Schema(options)
export class Products extends Document {
  @ApiProperty({
    example: 'sofa',
    description: 'product name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 100,
    description: 'product quantity',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    example: '대한민국',
    description: 'manufacture',
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  manufacture: string;

  @ApiProperty({
    example: 'sofa',
    description: 'category',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    example: 1000,
    description: 'product price',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 'this is the best sofa',
    description: 'content',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: 'this is the best sofa',
    description: 'review',
  })
  review: ProductReviewDto[];

  @ApiProperty({
    example: 1000,
    description: 'prodcut reviewCNT',
    required: true,
  })
  @Prop({
    required: true,
    default: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  reviewCNT: number;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);

ProductsSchema.virtual('readOnlyData').get(function (this: Products) {
  return {
    id: this.id,
    name: this.name,
    quantity: this.quantity,
    manufacture: this.manufacture,
    category: this.category,
    price: this.price,
    content: this.content,
    review: this.review,
    reviewCnt: this.reviewCNT,
  };
});
