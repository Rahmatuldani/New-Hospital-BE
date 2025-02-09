import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersGateway } from './users.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { LibModule } from '@/lib/lib.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    LibModule
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersGateway],
  exports: [UsersService]
})
export class UsersModule {}
