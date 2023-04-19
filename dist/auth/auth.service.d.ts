import { UsersRepository } from 'src/users/users.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersRepository;
    private jwtService;
    constructor(usersRepository: UsersRepository, jwtService: JwtService);
    jwtLogIn(data: LoginRequestDto): Promise<{
        token: string;
    }>;
}
