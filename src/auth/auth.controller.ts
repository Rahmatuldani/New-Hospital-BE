import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from '@/guards/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from '@/users/users.service';
import { EmployeesService } from '@/employees/employees.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly employeeService: EmployeesService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post("signIn")
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.employeeService.findOne(req['employeeId'])
    return user;
  }
}
