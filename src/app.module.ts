import { Module } from '@nestjs/common';
import { QuizModule } from 'src/quiz/quiz.module';
import { TodoModule } from './todolist/todo.module';
import { VaccinationModule } from './vaccination/vaccination.module';

@Module({
  imports: [QuizModule,TodoModule,VaccinationModule],
})
export class AppModule {}
