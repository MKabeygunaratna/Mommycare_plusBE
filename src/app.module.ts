import { Module } from '@nestjs/common';
import { QuizModule } from 'src/quiz/quiz.module';

@Module({
  imports: [QuizModule],
})
export class AppModule {}
