import { Module } from '@nestjs/common';
import { QuizModule } from './quiz/quiz.module';
import { EmailModule } from './email/email.module'; // Import EmailModule

@Module({
  imports: [QuizModule, EmailModule],  // Include EmailModule here
})
export class AppModule {}
