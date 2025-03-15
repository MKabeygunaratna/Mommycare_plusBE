import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('ask-voice')
  @UseInterceptors(FileInterceptor('audio_file'))
  async askVoiceQuestion(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { error: 'No file uploaded' };
    }
    return this.chatbotService.getLLMVoiceResponse(file);
  }
}
