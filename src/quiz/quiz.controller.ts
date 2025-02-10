import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  // Endpoint to calculate score and save quiz result
  @Post('submit')
  async submitQuiz(
    @Body() body: { userId: string; answers: string[] }
  ) {
    const { userId, answers } = body;
    const score = this.quizService.calculateScore(userId, answers);
    const isDepressed = this.quizService.checkStatus(score);

    const result = await this.quizService.saveQuizResult(userId, answers, score, isDepressed);
    return result;
  }

  // Endpoint to retrieve quiz results for a user
  @Get('results/:userId')
  async getQuizResults(@Param('userId') userId: string) {
    return await this.quizService.getQuizResults(userId);
  }
}
