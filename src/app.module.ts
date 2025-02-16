import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PatientsModule } from './patients/patients.module';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { LibModule } from './lib/lib.module';
import { AuthModule } from './auth/auth.module';
import { EmployeesModule } from './employees/employees.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async(configService: ConfigService) => ({
        uri: configService.get<string>("database.uri"),
        dbName: configService.get<string>("database.name")
      })
    }),
    PatientsModule,
    UsersModule,
    LibModule,
    AuthModule,
    EmployeesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
