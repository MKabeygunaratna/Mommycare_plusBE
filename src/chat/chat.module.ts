import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports:[FirebaseModule],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  exports: [ChatService], // Export service if needed in other modules
})
export class ChatModule {}