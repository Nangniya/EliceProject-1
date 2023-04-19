import { Products } from './products.schema';
declare const ProductRequestDto_base: import("@nestjs/common").Type<Pick<Products, "name" | "quantity" | "content" | "manufacture" | "category" | "price">>;
export declare class ProductRequestDto extends ProductRequestDto_base {
}
export {};
