import { User } from '../users.schema';
declare const ReadOnlyUserDto_base: import("@nestjs/common").Type<Pick<User, "name" | "email">>;
export declare class ReadOnlyUserDto extends ReadOnlyUserDto_base {
    id: string;
}
export {};
