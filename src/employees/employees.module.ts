import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './entities/employee.entity';
import { LibModule } from '@/lib/lib.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Employee.name, schema: EmployeeSchema}]),
    LibModule
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [EmployeesService]
})
export class EmployeesModule {}
