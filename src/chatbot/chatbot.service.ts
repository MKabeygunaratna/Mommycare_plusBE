import { Injectable } from '@nestjs/common';
import axios from 'axios';
import FormData from 'form-data';
import { Express } from 'express';

@Injectable()
export class ChatbotService {
  private VOICE_LLM_API_URL = 'http://127.0.0.1:8000/get_answer_voice/';

  async getLLMVoiceResponse(audioFile: Express.Multer.File) {
    try {
      if (!audioFile || !audioFile.buffer) {
        throw new Error('Invalid file upload');
      }

      const formData = new FormData();
      formData.append('audio_file', audioFile.buffer, {
        filename: audioFile.originalname,
        contentType: audioFile.mimetype,
      });

      const response = await axios.post(this.VOICE_LLM_API_URL, formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });

      return response.data;
    } catch (error) {
      return { error: 'Failed to process voice input', details: error.message };
    }
  }
}
