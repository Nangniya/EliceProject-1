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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const swagger_1 = require("@nestjs/swagger");
const product_reqest_dto_1 = require("./dto/product.reqest.dto");
const prdouct_dto_1 = require("./dto/prdouct.dto");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async productCreate(data) {
        return await this.productsService.create(data);
    }
    async getDetailProduct(id) {
        return await this.productsService.getDetailProduct(id);
    }
    getTopNineReviewProduct() {
        return;
    }
    async getRecentProduct() {
        return await this.productsService.getRecentProduct();
    }
    async getCategory(body) {
        return await this.productsService.getCategory(body.category);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '상품 등록하기' }),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_reqest_dto_1.ProductRequestDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "productCreate", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'product id에 해당하는 상품 불러오기' }),
    (0, common_1.Get)('id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getDetailProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '리뷰 평균이 가장 높은 상품 9개' }),
    (0, common_1.Get)('bestreview'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getTopNineReviewProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '최근에 등록된 상품 3개' }),
    (0, common_1.Get)('recent'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getRecentProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '같은 카테고리 상품 9개' }),
    (0, common_1.Post)('category'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [prdouct_dto_1.categoryDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getCategory", null);
ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map