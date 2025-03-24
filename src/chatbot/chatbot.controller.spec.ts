import { Test, TestingModule } from '@nestjs/testing';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';

describe('ChatbotController', () => {
  let controller: ChatbotController;
  let chatbotService: ChatbotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatbotController],
      providers: [
        {
          provide: ChatbotService,
          useValue: {
            getLLMResponse: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ChatbotController>(ChatbotController);
    chatbotService = module.get<ChatbotService>(ChatbotService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('askQuestion', () => {
    it('should call chatbotService.getLLMResponse with the provided query', async () => {
      // Arrange
      const query = 'What are the symptoms of pregnancy?';
      const expectedResponse = {
        answer: 'Common symptoms of pregnancy include missed periods, nausea, breast tenderness, fatigue, and frequent urination.',
        sources: ['medical-info-123']
      };
      
      jest.spyOn(chatbotService, 'getLLMResponse').mockResolvedValue(expectedResponse);
      
      // Act
      const result = await controller.askQuestion(query);
      
      // Assert
      expect(chatbotService.getLLMResponse).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedResponse);
    });

    it('should propagate errors from the chatbot service', async () => {
      // Arrange
      const query = 'Invalid query';
      const error = new Error('Failed to process query');
      
      jest.spyOn(chatbotService, 'getLLMResponse').mockRejectedValue(error);
      
      // Act & Assert
      await expect(controller.askQuestion(query)).rejects.toThrow(error);
      expect(chatbotService.getLLMResponse).toHaveBeenCalledWith(query);
    });
  });
});