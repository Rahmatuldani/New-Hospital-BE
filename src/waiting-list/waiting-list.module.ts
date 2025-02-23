import { Module } from '@nestjs/common';
import { WaitingListService } from './waiting-list.service';
import { WaitingListController } from './waiting-list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WaitingList, WaitingListSchema } from './entities/waiting-list.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{name: WaitingList.name, schema: WaitingListSchema}])
  ],
  controllers: [WaitingListController],
  providers: [WaitingListService],
})
export class WaitingListModule {}
