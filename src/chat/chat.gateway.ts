import {
    WebSocketGateway,
    SubscribeMessage,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
  } from '@nestjs/websockets';
  import { Server,Socket } from 'socket.io';
  import { ChatService } from './chat.service';
  
  @WebSocketGateway({ cors: {origin:'*'}})
  export class ChatGateway implements OnGatewayConnection,OnGatewayDisconnect{
    @WebSocketServer()// to send multiple cleints we use webserver
    server: Server;
  
    constructor(private readonly chatService: ChatService) {}
  
     handleConnection(client: Socket) {
      console.log("New user connected", client.id);
      
      client.broadcast.emit('User joined',{message: `user joined the chat:${client.id}`})
     }
  
     handleDisconnect(client: Socket) {
      console.log(" user disconnected....", client.id);
      this.server.emit('User left',{message: `user left the chat:${client.id}`});
     }
  
    @SubscribeMessage('sendMessage')
    async handleMessage( @MessageBody() message:any) {
        this.server.emit('message', message);//broadcastinf the message to all clients
  
        console.log("Message:", message);
         
         const msg = await this.chatService.sendMessagetoSave( message);
       return msg;
    }
   
  }
  
  