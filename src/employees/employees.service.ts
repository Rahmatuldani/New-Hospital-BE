import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './entities/employee.entity';
import { Model } from 'mongoose';
import { LibService } from '@/lib/lib.service';

@Injectable()
export class EmployeesService {
  constructor (
    @InjectModel(Employee.name) private readonly employeesModel: Model<Employee>,
    private readonly libService: LibService
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const np: string = this.libService.generateNp(createEmployeeDto.birthDate)
    createEmployeeDto['np'] = np;
    const employee = await this.employeesModel.create(createEmployeeDto)

    return employee.save();
  }

  async findAll(): Promise<Employee[]> {
    return await this.employeesModel.find();
  }

  async findOne(id: string): Promise<Employee | null> {
    return await this.employeesModel.findById(id);
  }
  
  async findByNp(np: string): Promise<Employee | null> {
    return await this.employeesModel.findOne({np: np});
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const updatedEmployee = await this.employeesModel.findByIdAndUpdate(id, updateEmployeeDto, {new: true}).exec()
    return updatedEmployee as Employee;
  }

  async remove(id: string): Promise<Employee> {
    const deletedEmployee = await this.employeesModel.findByIdAndDelete(id).exec()
    return deletedEmployee as Employee;
  }
}
