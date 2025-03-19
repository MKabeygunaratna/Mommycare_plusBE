import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { QuizModule } from 'src/quiz/quiz.module';
import { TodoModule } from './todolist/todo.module';
import { VaccinationModule } from './vaccination/vaccination.module';
import { ChatModule } from './chat/chat.module';
import { FirebaseModule } from './firebase/firebase.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatService } from './chat/chat.service';
=======
>>>>>>> 5ce7c73ab8f106def5b7c494fee55bbe72555a1b

import { QuizModule } from 'src/quiz/quiz.module';
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
import { AuthModule } from './auth/auth.module';
import {SleepTrackerModule} from './sleep-tracker/sleep-tracker.module';
@Module({
<<<<<<< HEAD
  imports: [QuizModule,TodoModule,VaccinationModule,ChatModule,FirebaseModule],
  controllers: [AppController],  // Include controllers
  providers: [AppService,ChatService], 
=======
  imports: [QuizModule,TodoModule,VaccinationModule,ChatModule,FirebaseModule,EmailModule,ChatbotModule, AuthModule, SleepTrackerModule],
  controllers: [AppController],  // Include controllers
  providers: [AppService,ChatService], 

>>>>>>> 5ce7c73ab8f106def5b7c494fee55bbe72555a1b
})
export class AppModule {}
