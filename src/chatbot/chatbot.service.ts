import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ChatbotService {
  private ENGLISH_LLM_API_URL = 'http://127.0.0.1:8000/get_answer/';
  private SINHALA_LLM_API_URL = 'http://127.0.0.1:8000/get_answer_sinhala/';

  private detectLanguagePercentage(text: string): string {
    const sinhalaRegex = /[\u0D80-\u0DFF]/g; // Unicode range for Sinhala script
    const englishRegex = /[a-zA-Z]/g;

    const sinhalaMatches = text.match(sinhalaRegex) || [];
    const englishMatches = text.match(englishRegex) || [];

    const totalChars = text.length;
    if (totalChars === 0) {
      throw new Error("No text provided.");
    }

    const sinhalaPercentage = ((sinhalaMatches.length / totalChars) * 100);
    const englishPercentage = (englishMatches.length / totalChars) * 100 + 10;

    console.log(`Sinhala: ${sinhalaPercentage.toFixed(2)}%`);
    console.log(`English: ${englishPercentage.toFixed(2)}%`);

    return englishPercentage > sinhalaPercentage ? this.ENGLISH_LLM_API_URL : this.SINHALA_LLM_API_URL;
  }

  async getLLMResponse(query: string) {
    try {
      const url = this.detectLanguagePercentage(query);
      const response = await axios.post(url, { query });
      return response.data;
    } catch (error) {

      return { error: 'Failed to get response from LLM', details: error.message };
    }
  }
}
