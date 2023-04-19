import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiOperation } from '@nestjs/swagger';
import { ProductRequestDto } from './dto/product.reqest.dto';
import { categoryDto } from './dto/prdouct.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: '상품 등록하기' })
  @Post('create')
  async productCreate(@Body() data: ProductRequestDto) {
    return await this.productsService.create(data);
  }

  @ApiOperation({ summary: 'product id에 해당하는 상품 불러오기' })
  @Get('id/:id')
  async getDetailProduct(@Param('id') id: string) {
    return await this.productsService.getDetailProduct(id);
  }

  @ApiOperation({ summary: '리뷰 평균이 가장 높은 상품 9개' })
  @Get('bestreview')
  getTopNineReviewProduct() {
    return;
  }

  @ApiOperation({ summary: '최근에 등록된 상품 3개' })
  @Get('recent')
  async getRecentProduct() {
    return await this.productsService.getRecentProduct();
  }

  @ApiOperation({ summary: '같은 카테고리 상품 9개' })
  @Post('category')
  async getCategory(@Body() body: categoryDto) {
    return await this.productsService.getCategory(body.category);
  }
}
