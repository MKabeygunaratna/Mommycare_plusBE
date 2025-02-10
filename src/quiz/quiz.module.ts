import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  providers: [QuizService],
  controllers: [QuizController],
})
export class QuizModule {}
