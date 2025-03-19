import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  // Endpoint to submit the quiz
  @Post('submit')
  async submitQuiz(
    @Body() body: { userId: string; answers: number[]; guardianEmail: string; doctorEmail: string }
  ) {
<<<<<<< HEAD
    const { userId, answers } = body;
    const score = this.quizService.calculateScore(userId, answers);
    const isDepressed = this.quizService.checkStatus(score);

    const result = await this.quizService.saveQuizResult(userId, answers, score, isDepressed);
    return result;
=======

    const { userId, answers, guardianEmail, doctorEmail } = body;
    return await this.quizService.processQuizSubmission(userId, answers, guardianEmail, doctorEmail);

>>>>>>> 5ce7c73ab8f106def5b7c494fee55bbe72555a1b
  }

  // Endpoint to retrieve quiz results for a user
  @Get('results/:userId')
  async getQuizResults(@Param('userId') userId: string) {
    return await this.quizService.getQuizResults(userId);
  }
}
