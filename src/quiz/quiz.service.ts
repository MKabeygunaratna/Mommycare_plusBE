import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class QuizService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly emailService: EmailService,
  ) {}

  // Calculate the score based on answers
  calculateScore(answers: number[]): number {
    return answers.reduce((sum, score) => sum + score, 0);
  }

  // Determine the depression level
  determineDepressionLevel(score: number): string {
    if (score >= 19) {
        return 'Severe';
    } else if (score >= 12) {
        return 'Mild';
    } else {
        return 'Normal';
    }
}

  // Process the quiz submission: Calculate score, save, and send email
  async processQuizSubmission(
    userId: string,
    answers: number[],
    guardianEmail: string,
    doctorEmail: string
  ) {
    try {
      const score = this.calculateScore(answers);
      const depressionLevel = this.determineDepressionLevel(score);

      // Save the quiz result to Firebase
      const result = await this.firebaseService.saveQuizResult(userId, answers, score);

      // Send an email only if the depression level is Mild or Severe
      if (depressionLevel !== 'Normal') {
        await this.emailService.sendDepressionAlert(userId, depressionLevel, [guardianEmail, doctorEmail]);
      }

      return { success: true, message: 'Quiz submitted successfully.', depressionLevel, result };
    } catch (error) {
      console.error('Error processing quiz submission:', error);
      return { success: false, message: 'Error processing quiz submission.' };
    }
  }

  // Retrieve quiz results for a user
  async getQuizResults(userId: string) {
    try {
      return await this.firebaseService.getQuizResults(userId);
    } catch (error) {
      console.error('Error retrieving quiz results:', error);
      return { success: false, message: 'Error retrieving quiz results.' };
    }
  }
}
