import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
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

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

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
