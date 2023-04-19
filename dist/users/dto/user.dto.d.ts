import { User } from '../users.schema';
declare const ReadOnlyUserDto_base: import("@nestjs/common").Type<Pick<User, "name" | "email">>;
export declare class ReadOnlyUserDto extends ReadOnlyUserDto_base {
    id: string;
}
declare const userIdDto_base: import("@nestjs/common").Type<Pick<ReadOnlyUserDto, "id">>;
export declare class userIdDto extends userIdDto_base {
}
export {};
