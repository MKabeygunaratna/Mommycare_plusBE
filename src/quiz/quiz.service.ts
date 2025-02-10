import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class QuizService {
  constructor(private readonly firebaseService: FirebaseService) {}

  // Method to calculate the score based on answers
  calculateScore(userId: string, answers: string[]): number {
    const correctAnswers = ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B']; // Example correct answers
    let score = 0;

    // Loop through answers and compare with correct answers
    // answers.forEach((answer, index) => {
    //   if (answer === correctAnswers[index]) {
    //     score += 3; // 3 points for each correct answer
    //   }
    // });

    return score; // Return the calculated score
  }

  checkStatus(score: number){
    return score>12 ? true : false;
  }

  // Save quiz result to Firebase
  async saveQuizResult(userId: string, answers: string[], score: number, isDepressed: boolean) {
    try {
      return await this.firebaseService.saveQuizResult(userId, answers, score,isDepressed);
    } catch (error) {
      console.error('Error saving quiz result:', error);
      return { success: false, message: 'Error saving quiz result.' };
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
