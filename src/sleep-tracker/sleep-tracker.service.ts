import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SleepTrackerService {
  constructor(private readonly httpService: HttpService) {}

  async getSleepData(accessToken: string) {
    const url = 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate';

    const requestBody = {
      aggregateBy: [{ dataTypeName: 'com.google.sleep.segment' }],
      bucketByTime: { durationMillis: 86400000 }, // 1 day
      startTimeMillis: Date.now() - 7 * 24 * 60 * 60 * 1000, // Last 7 days
      endTimeMillis: Date.now(),
    };

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await firstValueFrom(this.httpService.post(url, requestBody, { headers }));
      return response.data;
    } catch (error) {
      console.error('Error fetching sleep data:', error.response?.data || error.message);
      throw new Error('Failed to fetch sleep data');
    }
  }
}
