import { Module } from '@nestjs/common';
import { QuizModule } from './quiz/quiz.module';
import { EmailModule } from './email/email.module'; // Import EmailModule
import { ChatbotModule } from './chatbot/chatbot.module';
import { ChatbotVoiceModule } from './chatbotvoice/chatbotvoice.module';


@Module({
  imports: [QuizModule, EmailModule,ChatbotVoiceModule,ChatbotModule],  // Include EmailModule here
})
export class AppModule {}
