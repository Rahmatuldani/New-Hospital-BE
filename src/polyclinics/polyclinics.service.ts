import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AddPolyclinicDoctorDto, CreatePolyclinicDto } from './dto/create-polyclinic.dto';
import { UpdatePolyclinicDto } from './dto/update-polyclinic.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Polyclinic } from './entities/polyclinic.entity';
import { Model } from 'mongoose';
import { EmployeesService } from '@/employees/employees.service';
import { Employee } from '@/employees/entities/employee.entity';
import { Role } from '@/config/types';

@Injectable()
export class PolyclinicsService {
  constructor (
    @InjectModel(Polyclinic.name) private readonly polyclinicModel: Model<Polyclinic>,
    private readonly employeeService: EmployeesService
  ) {}

  async create(createPolyclinicDto: CreatePolyclinicDto) {
    const newPoly = await this.polyclinicModel.create(createPolyclinicDto)
    return newPoly.save();
  }

  async addDoctor(polyId, addPolyclinicDoctorDto: AddPolyclinicDoctorDto) {
    const doctor: Employee | null = await this.employeeService.findOne(addPolyclinicDoctorDto.doctorId)
    if (!doctor || doctor.role !== Role.DOCTOR) {
      throw new NotFoundException("Doctor data not found")
    }
    const poly: Polyclinic | null = await this.findOne(polyId)
    if (!poly) {
      throw new NotFoundException("Polyclinic data not found")
    }
    const existDoctor = poly.doctors.filter((doc) => doc === doctor.id)
    if (existDoctor.length != 0) {
      throw new BadRequestException("Doctor already exist")
    }
    await poly.doctors.push(doctor.id)
    await poly.save()
    return poly.populate("doctors");
  }

  findAll() {
    return this.polyclinicModel.find().populate("doctors");
  }

  findOne(id: string) {
    return this.polyclinicModel.findById(id).populate("doctors");
  }

  async update(id: string, updatePolyclinicDto: UpdatePolyclinicDto) {
    const updatedPoly = await this.polyclinicModel.findByIdAndUpdate(id, updatePolyclinicDto, {new: true}).populate("doctors");
    return updatedPoly as Polyclinic;
  }

  async remove(id: string) {
    const poly = await this.findOne(id)
    if (!poly) {
      throw new NotFoundException("Polyclinic data not found")
    }
    const deletedPoly = await this.polyclinicModel.findByIdAndDelete(id).populate("doctors");
    return deletedPoly as Polyclinic;
  }
}
