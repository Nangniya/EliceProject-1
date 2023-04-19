/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { ProductsService } from './products.service';
import { ProductRequestDto } from './dto/product.reqest.dto';
import { categoryDto } from './dto/prdouct.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    productCreate(data: ProductRequestDto): Promise<import("./products.schema").Products>;
    getDetailProduct(id: string): Promise<import("./products.schema").Products>;
    getTopNineReviewProduct(): void;
    getRecentProduct(): Promise<(import("mongoose").Document<unknown, {}, import("./products.schema").Products> & Omit<import("./products.schema").Products & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    getCategory(body: categoryDto): Promise<(import("mongoose").Document<unknown, {}, import("./products.schema").Products> & Omit<import("./products.schema").Products & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
}
