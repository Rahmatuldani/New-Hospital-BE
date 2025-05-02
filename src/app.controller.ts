import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { PatientsService } from './patients/patients.service';
import { faker } from '@faker-js/faker';
import { CreatePatientDto } from './patients/dto/create-patient.dto';
import { BloodType, Payment, Religion, Gender, Role } from './config/types';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';
import { CreateEmployeeDto } from './employees/dto/create-employee.dto';
import { EmployeesService } from './employees/employees.service';
import { Employee } from './employees/entities/employee.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly patientService: PatientsService,
    private readonly usersService: UsersService,
    private readonly employeesService: EmployeesService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("generatePatients/:sample")
  async generatePatients(@Param('sample') sample: string) {
    for (let index = 0; index < +sample; index++) {
      const patient: CreatePatientDto = {
        nik: faker.string.numeric(16),
        name: faker.person.fullName(),
        gender: faker.helpers.arrayElement(Object.values(Gender)),
        birthDate: faker.date.birthdate(),
        birthPlace: faker.location.city(),
        address: faker.location.streetAddress(),
        bloodType: faker.helpers.arrayElement(Object.values(BloodType)),
        payment: faker.helpers.arrayElement(Object.values(Payment)),
        bpjs: faker.string.numeric(20),
        job: faker.person.jobTitle(),
        partner: faker.person.fullName(),
        phoneNumber: faker.string.numeric(12),
        partnerPhone: faker.string.numeric(12),
        partnerAddress: faker.location.streetAddress(),
        religion: faker.helpers.arrayElement(Object.values(Religion)),
      }
      await this.patientService.create(patient)
    }

    return 'Generate patients data success'
  }
  
  @Get("generateEmployees/:sample")
  async generateEmployees(@Param('sample') sample: string) {
    for (let index = 0; index < +sample; index++) {
      const employee: CreateEmployeeDto = {
        nik: faker.string.numeric(16),
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        birthDate: faker.date.birthdate(),
        birthPlace: faker.location.city(),
        gender: faker.helpers.arrayElement(Object.values(Gender)),
        role: faker.helpers.arrayElement(Object.values(Role)),
      }
      const newEmployee: Employee = await this.employeesService.create(employee)
      await this.usersService.create(newEmployee)
    }

    return 'Generate employees data success'
  }
}
