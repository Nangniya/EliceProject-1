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
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { UserRequestDto } from './dto/user.request.dto';
import { UsersService } from './users.service';
import { addCartDto, userCartDto } from './dto/user.cart.dto';
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    getCurrentUser(user: any): any;
    sighUp(body: UserRequestDto): Promise<{
        id: string;
        email: string;
        name: string;
        address: string;
        phoneNumber: string;
        cart: userCartDto[];
        orderId: string[];
    }>;
    logIn(data: LoginRequestDto): Promise<{
        token: string;
    }>;
    addToCart(body: addCartDto): Promise<import("mongoose").Document<unknown, {}, import("./users.schema").User> & Omit<import("./users.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
}
