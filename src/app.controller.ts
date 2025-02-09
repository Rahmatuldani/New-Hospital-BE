import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { PatientsService } from './patients/patients.service';
import { faker } from '@faker-js/faker';
import { CreatePatientDto } from './patients/dto/create-patient.dto';
import { BloodType, PaymentMethod, Religion, Gender } from './config/types';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly patientService: PatientsService
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
        paymentMethod: faker.helpers.arrayElement(Object.values(PaymentMethod)),
        bpjs: faker.string.numeric(20),
        job: faker.person.jobTitle(),
        partner: faker.person.fullName(),
        patientPhone: faker.string.numeric(12),
        partnerPhone: faker.string.numeric(12),
        partnerAddress: faker.location.streetAddress(),
        religion: faker.helpers.arrayElement(Object.values(Religion)),
      }
      await this.patientService.create(patient)
    }

    return 'Generate patients data success'
  }
}
