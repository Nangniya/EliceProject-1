import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  UserRequestDto,
  UserUpdateDto,
  orderIdAddUserDto,
} from './dto/user.request.dto';
import { User } from './users.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async existByEmail(email: string): Promise<any> {
    try {
      const result = await this.userModel.exists({ email });
      return result;
    } catch (error) {
      throw new HttpException('db error', 400);
    }
  }

  async create(user: UserRequestDto): Promise<User> {
    return await this.userModel.create(user);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async findUserByIdWithoutPassword(
    userId: string | Types.ObjectId,
  ): Promise<User | null> {
    const user = await this.userModel.findById(userId);
    return user;
  }

  async updateUser(body: UserUpdateDto, _id: string) {
    const { name, address, phoneNumber } = body;
    const user = await this.userModel.findById({ _id });
    user.name = name;
    user.address = address;
    user.phoneNumber = phoneNumber;
    return user.save();
  }

  async deleteUser(_id: string) {
    return await this.userModel.deleteOne({ _id });
  }
  async addOrder(body: orderIdAddUserDto, _id: string) {
    const user = await this.userModel.findById({ _id });
    if (user.orderId.find((id) => id == body.orderId)) {
      throw new UnauthorizedException('해당 주문이 이미 존재합니다.');
    } else {
      user.orderId.push(body.orderId);
    }
    return user.save();
  }
}
