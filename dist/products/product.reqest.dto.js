"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const products_schema_1 = require("./products.schema");
class ProductRequestDto extends (0, swagger_1.PickType)(products_schema_1.Products, [
    'name',
    'quantity',
    'manufacture',
    'category',
    'price',
    'content',
]) {
}
exports.ProductRequestDto = ProductRequestDto;
//# sourceMappingURL=product.reqest.dto.js.map