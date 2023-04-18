import { UserRequestDto } from './dto/user.request.dto';
import { UsersRepository } from './users.repository';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    signUp(body: UserRequestDto): Promise<{
        id: string;
        email: string;
        name: string;
        address: string;
        phoneNumber: string;
        cart: import("./dto/user.cart.dto").userCartDto[];
        orderId: string[];
    }>;
}
