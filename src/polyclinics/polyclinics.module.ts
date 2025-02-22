import { Module } from '@nestjs/common';
import { PolyclinicsService } from './polyclinics.service';
import { PolyclinicsController } from './polyclinics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Polyclinic, PolyclinicSchema } from './entities/polyclinic.entity';
import { EmployeesModule } from '@/employees/employees.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Polyclinic.name, schema: PolyclinicSchema}]),
    EmployeesModule,
  ],
  controllers: [PolyclinicsController],
  providers: [PolyclinicsService],
})
export class PolyclinicsModule {}
