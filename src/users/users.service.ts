import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRequestDto } from './dto/user.request.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { userCartDto } from './dto/user.cart.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async signUp(body: UserRequestDto) {
    const { email, name, password } = body;
    const isUserExist = await this.usersRepository.existByEmail(email);

    if (isUserExist) {
      throw new UnauthorizedException('해당하는 이메일은 이미 존재합니다.');
    }

    const hashedPassedword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.create({
      email,
      name,
      password: hashedPassedword,
    });
    return user.readOnlyData;
  }

  async addToCart(id: string, cartData: userCartDto) {
    return await this.usersRepository.addToCart(id, cartData);
  }
}
