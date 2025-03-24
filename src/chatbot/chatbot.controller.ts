import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('ask')
  async askQuestion(@Body('query') query: string) {
    console.log('MEssage have been send to the backend');
    return this.chatbotService.getLLMResponse(query);
  }
}