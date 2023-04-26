import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { categoryRequestDto } from './dto/cateogry.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: '카테고리 만들기' })
  @Post('createCategory')
  async createCategory(@Body() body: categoryRequestDto) {
    return await this.categoriesService.createCategory(body);
  }
  @ApiOperation({ summary: '카테고리 하나 가져오기 by Id' })
  @Get('id/:id')
  async getById(@Param('id') id: string) {
    return await this.categoriesService.getById(id);
  }

  @ApiOperation({ summary: '카테고리 가져오기' })
  @Get()
  async getAllCategory() {
    return await this.categoriesService.getAllCategories();
  }

  @ApiOperation({ summary: '카테고리 delete' })
  @Delete(':id')
  async deletCategory(@Param('id') id: string) {
    return await this.categoriesService.deleteÇategory(id);
  }

  @ApiOperation({ summary: '카테고리 변경하기' })
  @ApiBody({
    type: categoryRequestDto,
  })
  @Patch(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() body: categoryRequestDto,
  ) {
    return await this.categoriesService.updateCategory(id, body);
  }
}
