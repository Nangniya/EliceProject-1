import { UsersRepository } from 'src/users/users.repository';
import { Payload } from './jwt.payload';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    validate(payload: Payload): Promise<import("../../users/users.schema").User>;
}
export {};
