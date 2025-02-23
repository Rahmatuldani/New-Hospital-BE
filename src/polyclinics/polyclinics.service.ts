import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AddPolyclinicDoctorDto, CreatePolyclinicDto } from './dto/create-polyclinic.dto';
import { UpdatePolyclinicDto } from './dto/update-polyclinic.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Polyclinic } from './entities/polyclinic.entity';
import { Model, Types } from 'mongoose';
import { EmployeesService } from '@/employees/employees.service';
import { Employee } from '@/employees/entities/employee.entity';
import { Role } from '@/config/types';

@Injectable()
export class PolyclinicsService {
  constructor (
    @InjectModel(Polyclinic.name) private readonly polyclinicModel: Model<Polyclinic>,
    private readonly employeeService: EmployeesService
  ) {}

  async create(createPolyclinicDto: CreatePolyclinicDto): Promise<Polyclinic> {
    const newPoly = await this.polyclinicModel.create(createPolyclinicDto)
    return newPoly.save();
  }

  async addDoctor(polyId, addPolyclinicDoctorDto: AddPolyclinicDoctorDto): Promise<Polyclinic> {
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

  async findAll(): Promise<Polyclinic[]> {
    return await this.polyclinicModel.find().populate("doctors");
  }

  async findOne(id: string): Promise<Polyclinic> {
    const poly = await this.polyclinicModel.findById(id);
    if (!poly) {
      throw new NotFoundException("Polyclincic not found")
    }
    return poly;
  }

  async update(id: string, updatePolyclinicDto: UpdatePolyclinicDto): Promise<Polyclinic> {
    const poly: Polyclinic = await this.findOne(id);
    await Object.assign(poly, updatePolyclinicDto)
    return poly.save();
  }

  async removeDoctor(id: string, doctorId: string): Promise<Polyclinic> {
    const poly: Polyclinic = await this.findOne(id)
    poly.doctors = poly.doctors.filter((doctor) => doctor !== doctorId)
    
    return await poly.save();
  }

  async remove(id: string) {
    const poly: Polyclinic = await this.findOne(id)
    await poly.deleteOne()
    return poly;
  }
}
