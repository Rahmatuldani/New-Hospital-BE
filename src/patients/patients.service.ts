import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from './entities/patient.entity';
import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<Patient>
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    createPatientDto['medicalRecord'] = faker.string.numeric(10);
    const newPatient = await this.patientModel.create(createPatientDto);
    return newPatient.save();
  }

  findAll() {
    return this.patientModel.find().exec();
  }

  findOne(id: string) {
    return this.patientModel.findById(id);
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    const updatedPatient = await this.patientModel.findByIdAndUpdate(id, updatePatientDto, {new: true}).lean().exec();
    return updatedPatient as Patient;
  }

  async remove(id: string) {
    const deletedPatient = await this.patientModel.findByIdAndDelete(id).lean().exec()
    return deletedPatient as Patient;
  }
}
