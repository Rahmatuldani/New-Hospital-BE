import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { User } from './entities/user.entity';

@WebSocketGateway(80, {
  cors: {
    origin: "*"
  },
  transports: ['websocket']
})
export class UsersGateway {
    @WebSocketServer() server: Server;
  
    handleCreatedUser(data: User) {
      this.server.emit("newUserCreated", data)
    }
  
    handleUpdatedUser(data: User) {
      this.server.emit("userUpdated", data)
    }
    
    handleDeletedUser(data: User) {
      this.server.emit("userDeleted", data)
    }
}
