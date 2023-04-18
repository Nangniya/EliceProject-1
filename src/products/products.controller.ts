import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiOperation } from '@nestjs/swagger';
import { ProductRequestDto } from './product.reqest.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: '리뷰 평균이 가장 높은 상품 9개' })
  @Get('bestreview')
  getTopNineReviewProduct() {
    return;
  }

  @ApiOperation({ summary: '최근에 등록된 상품 3개' })
  @Get('recent')
  getRecentProduct() {
    return;
  }

  @ApiOperation({ summary: '같은 카테고리 상품 9개' })
  @Post('category')
  getCategory(@Body() body: string) {
    return;
  }

  @ApiOperation({ summary: 'id에 해당하는 상품 불러오기' })
  @Get(':id')
  getDetailProduct() {
    return;
  }

  @ApiOperation({ summary: '상품 등록하기' })
  @Post()
  productCreate(@Body() body: ProductRequestDto) {
    return;
  }
}
