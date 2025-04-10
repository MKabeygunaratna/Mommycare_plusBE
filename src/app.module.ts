import { Module } from '@nestjs/common';

import { TodoModule } from './todolist/todo.module';
import { VaccinationModule } from './vaccination/vaccination.module';
import { ChatModule } from './chat/chat.module';
import { FirebaseModule } from './firebase/firebase.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatService } from './chat/chat.service';
import { QuizModule } from './quiz/quiz.module';
import { EmailModule } from './email/email.module'; 
import { ChatbotModule } from './chatbot/chatbot.module';

import { ChatbotVoiceModule } from './chatbotvoice/chatbotvoice.module';



import { AuthModule } from './auth/auth.module';
import {SleepTrackerModule} from './sleep-tracker/sleep-tracker.module';
@Module({
  imports: [QuizModule,TodoModule,VaccinationModule,ChatModule,FirebaseModule,EmailModule,ChatbotModule, AuthModule, SleepTrackerModule,ChatbotVoiceModule,ChatbotModule],
  controllers: [AppController],  // Include controllers
  providers: [AppService,ChatService], 


})
export class AppModule {}
