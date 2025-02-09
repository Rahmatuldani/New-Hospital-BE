import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientsGateway } from './patients.gateway';
import { ValidateIdPipe } from '@/pipes/validate-id/validate-id.pipe';

@Controller('patients')
export class PatientsController {
  constructor(
    private readonly patientsService: PatientsService,
    private readonly patientsGateway: PatientsGateway
  ) {}

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto) {
    const newPatient = await this.patientsService.create(createPatientDto);
    await this.patientsGateway.handleCreatedPatient(newPatient);
    return newPatient;
  }

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ValidateIdPipe) id: string) {
    const patient = await this.patientsService.findOne(id);
    if (!patient) {
      throw new NotFoundException("Patient not found")
    }
    return patient;
  }

  @Patch(':id')
  async update(@Param('id', ValidateIdPipe) id: string, @Body() updatePatientDto: UpdatePatientDto) {
    const patient = await this.patientsService.findOne(id);
    if (!patient) {
      throw new NotFoundException("Patient not found")
    }
    const updatedPatient = await this.patientsService.update(id, updatePatientDto);
    await this.patientsGateway.handleUpdatedPatient(updatedPatient);
    return updatedPatient;
  }

  @Delete(':id')
  async remove(@Param('id', ValidateIdPipe) id: string) {
    const patient = await this.patientsService.findOne(id);
    if (!patient) {
      throw new NotFoundException("Patient not found")
    }
    const deletedPatient = await this.patientsService.remove(id);
    await this.patientsGateway.handleDeletedPatient(deletedPatient);
    return deletedPatient;
  }
}
