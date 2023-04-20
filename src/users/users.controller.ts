import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { UserRequestDto } from './dto/user.request.dto';
import { UsersService } from './users.service';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { SuccessInterceptor } from 'src/common/interceptor/success.interceptor';
import { HttpExceptionFilter } from 'src/common/exception/http-exception.filter';
import { addCartDto, userCartDto } from './dto/user.cart.dto';

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
    return await this.usersService.signUp(body);
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

  @ApiOperation({ summary: '유저 장바구니 추가하기' })
  @ApiBody({
    description: '유저 장바구니 추가하기',
    type: addCartDto,
  })
  @Post('addToCart')
  addToCart(@Body() body: addCartDto) {
    const cartData: userCartDto = {
      productId: body.productId,
      quantity: body.quantity,
    };
    return this.usersService.addToCart(body.userId, cartData);
  }
}
