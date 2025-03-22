import { Injectable } from '@nestjs/common';
import axios from 'axios';
// Import FormData properly using require
const FormData = require('form-data');
import * as fs from 'fs';

@Injectable()
export class ChatbotVoiceService {
  private VOICE_LLM_API_URL = 'http://127.0.0.1:8000/get_answer_voice/';

  async getLLMVoiceResponse(file: Express.Multer.File) {
    try {
      // Create form data for sending the file
      const formData = new FormData();
      formData.append('audio_file', fs.createReadStream(file.path), {
        filename: file.originalname,
        contentType: file.mimetype,
      });

      console.log('Sending audio file to:', this.VOICE_LLM_API_URL);
      console.log('File details:', {
        fieldname: file.fieldname,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: file.path
      });

      // Send request to FastAPI endpoint
      const response = await axios.post(this.VOICE_LLM_API_URL, formData, {
        headers: {
          ...formData.getHeaders(),
        },
        timeout: 30000 // Add a reasonable timeout
      });

      // Clean up the file after successful processing
      try {
        fs.unlinkSync(file.path);
        console.log(`Cleaned up temporary file: ${file.path}`);
      } catch (cleanupError) {
        console.error(`Failed to clean up file: ${cleanupError.message}`);
      }

      return response.data;
    } catch (error) {
      console.error('Error in getLLMVoiceResponse:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      
      // Clean up the file on error as well
      try {
        if (file && file.path) {
          fs.unlinkSync(file.path);
        }
      } catch (cleanupError) {
        // Silently fail on cleanup error in error handler
      }
      
      return { 
        error: 'Failed to process voice query', 
        details: error.message,
        status: error.response?.status
      };
    }
  }
}