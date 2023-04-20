import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './categories.schema';
import { categoryRequestDto } from './dto/cateogry.dto';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async getAllCategory() {
    return await this.categoryModel.find();
  }

  async createCategory(body: categoryRequestDto) {
    return await this.categoryModel.create(body);
  }

  async existByCategory(body: categoryRequestDto) {
    try {
      const result = await this.categoryModel.exists(body);
      return result;
    } catch (error) {
      throw new HttpException('db error', 400);
    }
  }
}
