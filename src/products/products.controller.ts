import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiOperation } from '@nestjs/swagger';
import { ProductRequestDto } from './dto/product.reqest.dto';
import { categoryDto } from './dto/prdouct.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/multer.oprions';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: '상품 등록하기' })
  @Post('create')
  async productCreate(@Body() data: ProductRequestDto) {
    return await this.productsService.create(data);
  }

  @ApiOperation({ summary: '전체 상품 가져오기' })
  @Get()
  async getAllProducts() {
    return await this.productsService.getAllProducts();
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
  @Get('category/:categoryName')
  async getCategory(@Param('categoryName') categoryName: string) {
    return await this.productsService.getCategory(categoryName);
  }

  @ApiOperation({ summary: '상품이미지 업로드' })
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('products')))
  @Post('upload/:id')
  async updateProductImg(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param() id: { id: string },
  ) {
    return await this.productsService.uploadProductImg(id.id, files);
  }

  @ApiOperation({ summary: '상품 삭제' })
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productsService.deleteProduct(id);
  }

  @ApiOperation({ summary: '상품 변경하기' })
  @Patch(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() body: ProductRequestDto,
  ) {
    return await this.productsService.updateProduct(id, body);
  }
}
