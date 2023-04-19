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
exports.userIdDto = exports.ReadOnlyUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const users_schema_1 = require("../users.schema");
class ReadOnlyUserDto extends (0, swagger_1.PickType)(users_schema_1.User, [
    'email',
    'name',
]) {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '643e1ada43da3cb65097f989',
        description: 'id',
    }),
    __metadata("design:type", String)
], ReadOnlyUserDto.prototype, "id", void 0);
exports.ReadOnlyUserDto = ReadOnlyUserDto;
class userIdDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '643e1ada43da3cb65097f989',
        description: 'id',
    }),
    __metadata("design:type", String)
], userIdDto.prototype, "id", void 0);
exports.userIdDto = userIdDto;
//# sourceMappingURL=user.dto.js.map