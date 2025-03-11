import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { googleFitConfig } from '../config/google-fit.config';

@Injectable()
export class SleepTrackerService {
  private googleFitApiUrl = 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate';

  async getSleepData(accessToken: string): Promise<any> {
    const requestBody = {
      aggregateBy: [
        { dataTypeName: 'com.google.sleep.segment' }
      ],
      bucketByTime: { durationMillis: 86400000 }, // 1 day
      startTimeMillis: Date.now() - 7 * 24 * 60 * 60 * 1000, // Last 7 days
      endTimeMillis: Date.now()
    };

    try {
      const response = await axios.post(this.googleFitApiUrl, requestBody, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch sleep data: ${error.message}`);
    }
  }
}
