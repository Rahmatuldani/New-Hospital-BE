import { Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from '@/guards/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from '@/users/users.service';
import { EmployeesService } from '@/employees/employees.service';
import { LibService } from '@/lib/lib.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly employeeService: EmployeesService,
    private readonly libService: LibService,
    private readonly jwtService: JwtService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post("signIn")
  async signIn(@Body() signInDto: SignInDto) {
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

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.employeeService.findOne(req['employeeId'])
    return user;
  }
}
