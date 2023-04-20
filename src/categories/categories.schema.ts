import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';

const options: SchemaOptions = {
  collection: 'category',
};

@Schema(options)
export class Category extends Document {
  @ApiProperty({
    example: 'sofa',
    description: '카테고리',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export const _CategorySchema = SchemaFactory.createForClass(Category);

_CategorySchema.virtual('readOnlyData').get(function (this: Category) {
  return {
    name: this.name,
  };
});

export const CategorySchema = _CategorySchema;
