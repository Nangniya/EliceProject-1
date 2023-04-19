import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { UserRequestDto } from './dto/user.request.dto';
import { UsersService } from './users.service';
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
        cart: import("./dto/user.cart.dto").userCartDto[];
        orderId: string[];
    }>;
    logIn(data: LoginRequestDto): Promise<{
        token: string;
    }>;
}
