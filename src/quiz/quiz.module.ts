import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { EmailModule } from '../email/email.module'; // Import EmailModule

@Module({
  imports: [FirebaseModule, EmailModule], // Add EmailModule here
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
