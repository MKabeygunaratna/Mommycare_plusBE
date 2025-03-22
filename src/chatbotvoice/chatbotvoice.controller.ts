import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChatbotVoiceService } from './chatbotvoice.service';

@Controller('chatbot')
export class ChatbotVoiceController {
  constructor(private readonly chatbotVoiceService: ChatbotVoiceService) {}

  @Post('ask-voice')
  @UseInterceptors(FileInterceptor('audio_file'))
  async askVoiceQuestion(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { error: 'No file uploaded' };
    }
    return this.chatbotVoiceService.getLLMVoiceResponse(file);
  }
}