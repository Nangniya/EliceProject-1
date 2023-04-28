import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import {
  UserRequestDto,
  UserUpdateDto,
  orderIdAddUserDto,
} from './dto/user.request.dto';
import { UsersService } from './users.service';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { SuccessInterceptor } from 'src/common/interceptor/success.interceptor';
import { HttpExceptionFilter } from 'src/common/exception/http-exception.filter';

@Controller('users')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 user 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentUser(@CurrentUser() user) {
    return user.readOnlyData;
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiBody({
    description: 'post signup',
    type: UserRequestDto,
  })
  @Post('signup')
  async sighUp(@Body() body: UserRequestDto) {
    console.log(body);
    return await this.usersService.signUp(body);
  }

  @ApiOperation({ summary: '회원 정보 변경' })
  @ApiBody({
    description: 'User Update',
    type: UserUpdateDto,
  })
  @Put('updateUser/:id')
  async updateUser(@Body() body: UserUpdateDto, @Param('id') id: string) {
    return await this.usersService.updateUser(body, id);
  }

  @ApiOperation({ summary: '주문 추가' })
  @ApiBody({
    description: 'User Update',
  })
  @Patch('addOrder/:id')
  async userAddOrder(
    @Body() body: { orderId: string },
    @Param('id') id: string,
  ) {
    return await this.usersService.addOrder(body, id);
  }

  @ApiOperation({ summary: '회원 탈퇴' })
  @ApiBody({
    description: 'user delete',
  })
  @Delete('deleteUser/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }

  @ApiOperation({ summary: '로그인' })
  @ApiBody({
    description: 'post login',
    type: LoginRequestDto,
  })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }
}
