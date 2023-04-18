import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';

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
  @IsEmail()
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
  @IsString()
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
  manufacture: string;

  @ApiProperty({
    example: 'sofa',
    description: 'category',
  })
  @IsString()
  category: string;

  @ApiProperty({
    example: 1000,
    description: 'product price',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 'this is the best sofa',
    description: 'content',
  })
  @IsString()
  content: string;
}

export const UsersSchema = SchemaFactory.createForClass(Products);
