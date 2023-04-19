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
/// <reference types="mongoose/types/inferschematype" />
import { Document } from 'mongoose';
import { ProductReviewDto } from './dto/prodcut.review.dto';
export declare class Products extends Document {
    name: string;
    quantity: number;
    manufacture: string;
    category: string;
    price: number;
    content: string;
    review: ProductReviewDto[];
    reviewCNT: number;
}
export declare const ProductsSchema: import("mongoose").Schema<Products, import("mongoose").Model<Products, any, any, any, Document<unknown, any, Products> & Omit<Products & {
    _id: import("mongoose").Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Products, Document<unknown, {}, import("mongoose").FlatRecord<Products>> & Omit<import("mongoose").FlatRecord<Products> & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;
