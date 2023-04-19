import { ProductsService } from './products.service';
import { ProductRequestDto } from './product.reqest.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getTopNineReviewProduct(): void;
    getRecentProduct(): void;
    getCategory(body: string): void;
    getDetailProduct(): void;
    productCreate(body: ProductRequestDto): void;
}
