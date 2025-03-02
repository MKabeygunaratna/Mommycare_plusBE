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
    const { userId, answers, guardianEmail, doctorEmail } = body;
    return await this.quizService.processQuizSubmission(userId, answers, guardianEmail, doctorEmail);
  }

  // Endpoint to retrieve quiz results for a user
  @Get('results/:userId')
  async getQuizResults(@Param('userId') userId: string) {
    return await this.quizService.getQuizResults(userId);
  }
}
