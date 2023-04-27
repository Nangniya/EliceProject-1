import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  UserRequestDto,
  UserUpdateDto,
  orderIdAddUserDto,
} from './dto/user.request.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async signUp(body: UserRequestDto) {
    const { email, name, password, address, phoneNumber } = body;
    const isUserExist = await this.usersRepository.existByEmail(email);

    if (isUserExist) {
      throw new UnauthorizedException('해당하는 이메일은 이미 존재합니다.');
    }

    const hashedPassedword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.create({
      email,
      name,
      address,
      phoneNumber,
      password: hashedPassedword,
    });
    return user.readOnlyData;
  }

  async updateUser(body: UserUpdateDto, id: string) {
    return await this.usersRepository.updateUser(body, id);
  }

  async deleteUser(id: string) {
    return await this.usersRepository.deleteUser(id);
  }

  async addOrder(body: orderIdAddUserDto, id: string) {
    return await this.usersRepository.addOrder(body, id);
  }
}
