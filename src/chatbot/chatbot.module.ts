import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';

@Module({
  controllers: [ChatbotController],  // Register controllers
  providers: [ChatbotService],      // Register services
})
export class ChatbotModule {}
