import { Model, Types } from 'mongoose';
import { UserRequestDto } from './dto/user.request.dto';
import { User } from './users.schema';
export declare class UsersRepository {
    private readonly userModel;
    constructor(userModel: Model<User>);
    existByEmail(email: string): Promise<any>;
    create(user: UserRequestDto): Promise<User>;
    findUserByEmail(email: string): Promise<User | null>;
    findUserByIdWithoutPassword(userId: string | Types.ObjectId): Promise<User | null>;
}
