import { Module } from '@nestjs/common';
import { QuizModule } from './quiz/quiz.module';
import { EmailModule } from './email/email.module'; // Import EmailModule
import { ChatbotModule } from './chatbot/chatbot.module';


@Module({
  imports: [QuizModule, EmailModule,ChatbotModule],  // Include EmailModule here
})
export class AppModule {}
