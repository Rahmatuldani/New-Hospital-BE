import { LibService } from '@/lib/lib.service';
import { UsersService } from '@/users/users.service';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private libService: LibService,
        private jwtService: JwtService
    ) {}

    async signIn(signInDto: SignInDto) {
        const user = await this.usersService.findOne(signInDto.np);
        if (!user) {
            throw new NotFoundException('User not found')
        }
        if (!this.libService.verifyhash(signInDto.password, user.password)) {
            throw new UnauthorizedException('Wrong password')
        }
        const payload = { sub: user.employee._id }
        return {
            token: await this.jwtService.signAsync(payload)
        };
    }
}
