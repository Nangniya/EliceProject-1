import { Injectable } from '@nestjs/common';
import { Products } from './products.schema';
import { ProductRepository } from './products.repository';
import { ProductRequestDto } from './dto/product.reqest.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductRepository) {}

  async create(product: ProductRequestDto): Promise<Products> {
    return await this.productsRepository.create(product);
  }

  async getAllProducts() {
    return await this.productsRepository.getAllProducts();
  }

  async getDetailProduct(id: string): Promise<Products> {
    const product = await this.productsRepository.getDetailProduct(id);
    return product;
  }

  async getRecentProduct() {
    return await this.productsRepository.getRecentProduct();
  }

  async getCategory(body: string) {
    return await this.productsRepository.getCategory(body);
  }
}
