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
exports.addCartDto = exports.userCartDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class userCartDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1092012890',
        description: 'productId',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], userCartDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 100,
        description: 'productQuantity',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], userCartDto.prototype, "quantity", void 0);
exports.userCartDto = userCartDto;
class addCartDto extends (0, swagger_1.PickType)(userCartDto, [
    'productId',
    'quantity',
]) {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '643e1ada43da3cb65097f989',
        description: 'userId',
    }),
    __metadata("design:type", String)
], addCartDto.prototype, "userId", void 0);
exports.addCartDto = addCartDto;
//# sourceMappingURL=user.cart.dto.js.map