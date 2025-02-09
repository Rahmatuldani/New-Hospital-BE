import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Patient } from './entities/patient.entity';

@WebSocketGateway(80, {
  cors: {
    origin: "*"
  },
  transports: ['websocket']
})
export class PatientsGateway {
  @WebSocketServer() server: Server;

  handleCreatedPatient(data: Patient) {
    this.server.emit("newPatientCreated", data)
  }

  handleUpdatedPatient(data: Patient) {
    this.server.emit("patientUpdated", data)
  }
  
  handleDeletedPatient(data: Patient) {
    this.server.emit("patientDeleted", data)
  }
}
