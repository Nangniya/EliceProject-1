import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserRequestDto } from './dto/user.request.dto';
import { User } from './users.schema';
import { userCartDto } from './dto/user.cart.dto';

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

  async addToCart(id: string, cartData: userCartDto) {
    const user = await this.userModel.findById(id);
    user.cart.push(cartData);
    return user.save();
  }
}
