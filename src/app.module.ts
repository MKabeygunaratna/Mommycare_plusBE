import { Module } from '@nestjs/common';
import { QuizModule } from 'src/quiz/quiz.module';
import { TodoModule } from './todolist/todo.module';

@Module({
  imports: [QuizModule,TodoModule],
})
export class AppModule {}
