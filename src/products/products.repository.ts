import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products } from './products.schema';
import { ProductRequestDto } from './dto/product.reqest.dto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Products.name) private readonly productsModel: Model<Products>,
  ) {}

  async create(product: ProductRequestDto): Promise<Products> {
    return await this.productsModel.create(product);
  }

  async getDetailProduct(productId: string): Promise<Products> {
    const product = await this.productsModel.findById(productId);
    return product;
  }

  async getRecentProduct() {
    const products = await this.productsModel
      .find()
      .sort({ createdAt: -1 })
      .limit(3);
    return products;
  }
  async getCategory(category) {
    const products = await this.productsModel.find(category);
    return products;
  }
}
