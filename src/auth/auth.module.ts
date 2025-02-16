import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@/users/users.module';
import { LibModule } from '@/lib/lib.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmployeesModule } from '@/employees/employees.module';

@Module({
  imports: [
    UsersModule,
    LibModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async(configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>("secretKey"),
        // signOptions: {
        //   expiresIn: "60s"
        // }
      })
    }),
    EmployeesModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
