import { Test, TestingModule } from '@nestjs/testing';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';

describe('QuizController', () => {
  let controller: QuizController;
  let quizService: QuizService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizController],
      providers: [
        {
          provide: QuizService,
          useValue: {
            processQuizSubmission: jest.fn(),
            getQuizResults: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<QuizController>(QuizController);
    quizService = module.get<QuizService>(QuizService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('submitQuiz', () => {
    it('should call quizService.processQuizSubmission with the correct parameters', async () => {
      // Arrange
      const quizData = {
        userId: 'user123',
        answers: [1, 2, 3, 0, 2],
        guardianEmail: 'guardian@example.com',
        doctorEmail: 'doctor@example.com'
      };
      
      const expectedResponse = {
        success: true,
        score: 75,
        message: 'Quiz submitted successfully',
        resultId: 'result123'
      };
      
      jest.spyOn(quizService, 'processQuizSubmission').mockResolvedValue(expectedResponse);
      
      // Act
      const result = await controller.submitQuiz(quizData);
      
      // Assert
      expect(quizService.processQuizSubmission).toHaveBeenCalledWith(
        quizData.userId,
        quizData.answers,
        quizData.guardianEmail,
        quizData.doctorEmail
      );
      expect(result).toEqual(expectedResponse);
    });

    it('should propagate errors from the quiz service during submission', async () => {
      // Arrange
      const quizData = {
        userId: 'user123',
        answers: [1, 2, 3, 0, 2],
        guardianEmail: 'invalid-email',
        doctorEmail: 'doctor@example.com'
      };
      
      const error = new Error('Invalid email format');
      jest.spyOn(quizService, 'processQuizSubmission').mockRejectedValue(error);
      
      // Act & Assert
      await expect(controller.submitQuiz(quizData)).rejects.toThrow(error);
    });
  });

  describe('getQuizResults', () => {
    it('should call quizService.getQuizResults with the correct userId', async () => {
      // Arrange
      const userId = 'user123';
      
      // Updated to match the actual return type
      const expectedResults = {
        success: true,
        quizResults: [
          {
            id: 'result123',
            date: new Date(),
            score: 75,
            answers: [1, 2, 3, 0, 2]
          }
        ]
      };
      
      jest.spyOn(quizService, 'getQuizResults').mockResolvedValue(expectedResults);
      
      // Act
      const result = await controller.getQuizResults(userId);
      
      // Assert
      expect(quizService.getQuizResults).toHaveBeenCalledWith(userId);
      expect(result).toEqual(expectedResults);
    });

    it('should handle case when no quiz results are found', async () => {
      // Arrange
      const userId = 'user-no-quizzes';
      
      // Updated to match the "no results" response
      const expectedResponse = {
        success: false,
        message: 'No quiz results found for this user'
      };
      
      jest.spyOn(quizService, 'getQuizResults').mockResolvedValue(expectedResponse);
      
      // Act
      const result = await controller.getQuizResults(userId);
      
      // Assert
      expect(quizService.getQuizResults).toHaveBeenCalledWith(userId);
      expect(result).toEqual(expectedResponse);
    });

    it('should propagate errors from the quiz service when retrieving results', async () => {
      // Arrange
      const userId = 'nonexistent-user';
      const error = new Error('User not found');
      
      jest.spyOn(quizService, 'getQuizResults').mockRejectedValue(error);
      
      // Act & Assert
      await expect(controller.getQuizResults(userId)).rejects.toThrow(error);
      expect(quizService.getQuizResults).toHaveBeenCalledWith(userId);
    });
  });
});