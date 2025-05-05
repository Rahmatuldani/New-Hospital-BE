import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { PatientsGateway } from './patients.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from './entities/patient.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Patient.name, schema: PatientSchema}])
  ],
  controllers: [PatientsController],
  providers: [PatientsService, 
    PatientsGateway
  ],
  exports: [PatientsService]
})
export class PatientsModule {}
