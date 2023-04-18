"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersSchema = exports.Products = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const mongoose_2 = require("mongoose");
const options = {
    collection: 'products',
    timestamps: true,
};
let Products = class Products extends mongoose_2.Document {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'sofa',
        description: 'product name',
        required: true,
    }),
    (0, mongoose_1.Prop)({
        required: true,
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Products.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 100,
        description: 'product quantity',
        required: true,
    }),
    (0, mongoose_1.Prop)({
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], Products.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '대한민국',
        description: 'manufacture',
    }),
    (0, mongoose_1.Prop)({
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Products.prototype, "manufacture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'sofa',
        description: 'category',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Products.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1000,
        description: 'product price',
        required: true,
    }),
    (0, mongoose_1.Prop)({
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], Products.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'this is the best sofa',
        description: 'content',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Products.prototype, "content", void 0);
Products = __decorate([
    (0, mongoose_1.Schema)(options)
], Products);
exports.Products = Products;
exports.UsersSchema = mongoose_1.SchemaFactory.createForClass(Products);
//# sourceMappingURL=products.schema.js.map