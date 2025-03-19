import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SleepTrackerService } from './sleep-tracker.service';
import { SleepTrackerController } from './sleep-tracker.controller';

@Module({
  imports: [HttpModule],
  controllers: [SleepTrackerController],
  providers: [SleepTrackerService],
})
export class SleepTrackerModule {}
