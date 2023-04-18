"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const users_schema_1 = require("../users.schema");
class UserRequestDto extends (0, swagger_1.PickType)(users_schema_1.User, [
    'email',
    'name',
    'password',
]) {
}
exports.UserRequestDto = UserRequestDto;
//# sourceMappingURL=user.request.dto.js.map