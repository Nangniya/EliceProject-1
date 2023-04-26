import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';

const options: SchemaOptions = {
  collection: 'users',
  //스키마에 대한 옵션 db에서 하나가 만들어 질 때 timestamps를 하나 찍어준다.
  timestamps: true,
};

@Schema(options)
export class User extends Document {
  @ApiProperty({
    example: 'test@naver.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'kim',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '대전 동구 가양동',
    description: 'email',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: '010-0000-0000',
    description: 'phoneNumber',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    example: 'test',
    description: 'orderId',
    required: true,
  })
  @Prop({
    required: true,
    default: [],
  })
  orderId: string[];

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    address: string;
    phoneNumber: string;
    orderId: string[];
  };
}

export const _UsersSchema = SchemaFactory.createForClass(User);

_UsersSchema.virtual('readOnlyData').get(function (this: User) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    address: this.address,
    phoneNumber: this.phoneNumber,
    orderId: this.orderId,
  };
});

export const UsersSchema = _UsersSchema;
