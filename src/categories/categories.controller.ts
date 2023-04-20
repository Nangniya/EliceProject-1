import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiOperation } from '@nestjs/swagger';
import { categoryRequestDto } from './dto/cateogry.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: '카테고리 만들기' })
  @Post('createCategory')
  async createCategory(@Body() body: categoryRequestDto) {
    return await this.categoriesService.createCategory(body);
  }

  @ApiOperation({ summary: '카테고리 가져오기' })
  @Get()
  async getAllCategory() {
    return await this.categoriesService.getAllCategories();
  }
}
