import { Controller, Post, Headers } from '@nestjs/common';
import { SleepTrackerService } from './sleep-tracker.service';

@Controller('sleep-tracker')
export class SleepTrackerController {
  constructor(private readonly sleepTrackerService: SleepTrackerService) {}

  @Post('data')
  async getSleepData(@Headers('Authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { error: 'Missing or invalid Authorization header' };
    }

    const accessToken = authHeader.split(' ')[1]; // Extract the token
    return this.sleepTrackerService.getSleepData(accessToken);
  }
}
