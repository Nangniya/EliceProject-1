import { Injectable } from '@nestjs/common';
import { Products } from './products.schema';
import { ProductRepository } from './products.repository';
import { ProductRequestDto } from './dto/product.reqest.dto';
import { reviewDto } from './dto/prdouct.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductRepository) {}

  async create(product: ProductRequestDto) {
    return await this.productsRepository.create(product);
  }

  async getAllProducts() {
    return await this.productsRepository.getAllProducts();
  }

  async getDetailProduct(id: string) {
    return await this.productsRepository.getDetailProduct(id);
  }

  async getRecentProduct() {
    return await this.productsRepository.getRecentProduct();
  }

  async getCategory(categoryName: string) {
    return await this.productsRepository.getCategory(categoryName);
  }

  async uploadProductImg(id: string, files: Express.Multer.File[]) {
    const filesName = files.map((arg, i) => {
      return files[i].filename;
    });
    return await this.productsRepository.uploadProductImg(id, filesName);
  }

  async deleteProduct(id: string) {
    return await this.productsRepository.deleteProduct(id);
  }

  async updateProduct(id: string, body: ProductRequestDto) {
    return await this.productsRepository.updateProduct(id, body);
  }

  async orderDecide(id: string, body: reviewDto) {
    return await this.productsRepository.orderDecide(id, body);
  }
}
