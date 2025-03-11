import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ChatbotService {
  private LLM_API_URL = 'http://127.0.0.1:8000/get_answer/'; // Replace with actual LLM API URL

  async getLLMResponse(query: string) {
    try {
      const response = await axios.post(this.LLM_API_URL, { query });
      return response.data;
    } catch (error) {
      return { error: 'Failed to get response from LLM', details: error.message };
    }
  }
}
