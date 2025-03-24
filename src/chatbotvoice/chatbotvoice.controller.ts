import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChatbotVoiceService } from './chatbotvoice.service';

// Define the MulterFile interface (same as in service file)
interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

@Controller('chatbotvoice')
export class ChatbotVoiceController {
  constructor(private readonly chatbotVoiceService: ChatbotVoiceService) {}

  @Post('ask')
  @UseInterceptors(FileInterceptor('audio_file'))
  async askVoiceQuestion(@UploadedFile() file: MulterFile) {
    return this.chatbotVoiceService.getLLMVoiceResponse(file);
  }
}