import { Module } from '@nestjs/common';
import { QuizModule } from './quiz/quiz.module';
import { EmailModule } from './email/email.module'; 
import { ChatbotModule } from './chatbot/chatbot.module';
import { AuthModule } from './auth/auth.module';
import {SleepTrackerModule} from './sleep-tracker/sleep-tracker.module';


@Module({
  imports: [QuizModule, EmailModule,ChatbotModule, AuthModule, SleepTrackerModule],  // Include EmailModule here
})
export class AppModule {}
