import { Controller, Post, Req, Headers } from '@nestjs/common';
import { SleepTrackerService } from './sleep-tracker.service';
import { Request } from 'express';

@Controller('sleep-tracker')
export class SleepTrackerController {
  constructor(private readonly sleepTrackerService: SleepTrackerService) {}

  @Post('data')
  async getSleepData(@Req() req: Request) {
    const accessToken = req.cookies['access_token']; // Extract token from cookies

    if (!accessToken) {
      return { error: 'Missing or invalid Authorization token' };
    }

    // Call your service to process the sleep data with the JWT token
    return this.sleepTrackerService.getSleepData(accessToken);
  }
}
