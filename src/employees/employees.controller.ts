import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { UsersService } from '@/users/users.service';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly usersService: UsersService
  ) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeesService.create(createEmployeeDto);
    await this.usersService.create(employee);
    return employee;
  }

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const employee = await this.employeesService.findOne(id)
    if (!employee) {
      throw new NotFoundException('Employee data not found')
    }
    return employee;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.employeesService.findOne(id)
    if (!employee) {
      throw new NotFoundException('Employee data not found')
    }
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const employee = await this.employeesService.findOne(id)
    if (!employee) {
      throw new NotFoundException('Employee data not found')
    }
    return this.employeesService.remove(id);
  }
}
