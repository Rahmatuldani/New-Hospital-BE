import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PolyclinicsService } from './polyclinics.service';
import { AddPolyclinicDoctorDto, CreatePolyclinicDto } from './dto/create-polyclinic.dto';
import { UpdatePolyclinicDto } from './dto/update-polyclinic.dto';
import { ValidateIdPipe } from '@/pipes/validate-id/validate-id.pipe';

@Controller('polyclinics')
export class PolyclinicsController {
  constructor(private readonly polyclinicsService: PolyclinicsService) {}

  @Post()
  create(@Body() createPolyclinicDto: CreatePolyclinicDto) {
    return this.polyclinicsService.create(createPolyclinicDto);
  }
  
  @Post(":id/addDoctor")
  addDoctor(@Param("id", ValidateIdPipe) id: string, @Body() addPolyclinicDoctorDto: AddPolyclinicDoctorDto) {
    return this.polyclinicsService.addDoctor(id, addPolyclinicDoctorDto);
  }

  @Get()
  findAll() {
    return this.polyclinicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ValidateIdPipe) id: string) {
    return this.polyclinicsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ValidateIdPipe) id: string, @Body() updatePolyclinicDto: UpdatePolyclinicDto) {
    return this.polyclinicsService.update(id, updatePolyclinicDto);
  }

  @Delete(':id')
  remove(@Param('id', ValidateIdPipe) id: string) {
    return this.polyclinicsService.remove(id);
  }
  
  @Delete(':id/removeDoctor')
  removeDoctor(@Param('id', ValidateIdPipe) id: string, @Body() body: AddPolyclinicDoctorDto) {
    return this.polyclinicsService.removeDoctor(id, body.doctorId);
  }
}
