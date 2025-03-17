import { Module } from '@nestjs/common';
import { QuizModule } from 'src/quiz/quiz.module';
import { TodoModule } from './todolist/todo.module';
import { VaccinationModule } from './vaccination/vaccination.module';
import { ChatModule } from './chat/chat.module';
import { FirebaseModule } from './firebase/firebase.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatService } from './chat/chat.service';

@Module({
  imports: [QuizModule,TodoModule,VaccinationModule,ChatModule,FirebaseModule],
  controllers: [AppController],  // Include controllers
  providers: [AppService,ChatService], 
})
export class AppModule {}
