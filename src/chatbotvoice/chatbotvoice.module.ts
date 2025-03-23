import { Module } from '@nestjs/common';
import { ChatbotVoiceController } from './chatbotvoice.controller';
import { ChatbotVoiceService } from './chatbotvoice.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/audio',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [ChatbotVoiceController],
  providers: [ChatbotVoiceService],
  exports: [ChatbotVoiceService]
})
export class ChatbotVoiceModule {}