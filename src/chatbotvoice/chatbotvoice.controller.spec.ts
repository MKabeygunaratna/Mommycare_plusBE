import { Test, TestingModule } from '@nestjs/testing';
import { ChatbotVoiceController } from './chatbotvoice.controller';
import { ChatbotVoiceService } from './chatbotvoice.service';

describe('ChatbotVoiceController', () => {
  let controller: ChatbotVoiceController;
  let chatbotVoiceService: ChatbotVoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatbotVoiceController],
      providers: [
        {
          provide: ChatbotVoiceService,
          useValue: {
            getLLMVoiceResponse: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ChatbotVoiceController>(ChatbotVoiceController);
    chatbotVoiceService = module.get<ChatbotVoiceService>(ChatbotVoiceService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('askVoiceQuestion', () => {
    it('should call chatbotVoiceService.getLLMVoiceResponse with the uploaded file', async () => {
      // Arrange
      const mockFile: any = {
        fieldname: 'audio_file',
        originalname: 'question.wav',
        encoding: '7bit',
        mimetype: 'audio/wav',
        size: 10240,
        buffer: Buffer.from('mock audio data'),
      };
      
      const expectedResponse = {
        answer: 'This is a response to your voice question',
        audioUrl: 'https://example.com/response.mp3',
      };
      
      jest.spyOn(chatbotVoiceService, 'getLLMVoiceResponse').mockResolvedValue(expectedResponse);
      
      // Act
      const result = await controller.askVoiceQuestion(mockFile);
      
      // Assert
      expect(chatbotVoiceService.getLLMVoiceResponse).toHaveBeenCalledWith(mockFile);
      expect(result).toEqual(expectedResponse);
    });

    it('should propagate errors from the voice chatbot service', async () => {
      // Arrange
      const mockFile: any = {
        fieldname: 'audio_file',
        originalname: 'question.wav',
        encoding: '7bit',
        mimetype: 'audio/wav',
        size: 10240,
        buffer: Buffer.from('mock audio data'),
      };
      
      const error = new Error('Failed to process voice query');
      jest.spyOn(chatbotVoiceService, 'getLLMVoiceResponse').mockRejectedValue(error);
      
      // Act & Assert
      await expect(controller.askVoiceQuestion(mockFile)).rejects.toThrow(error);
      expect(chatbotVoiceService.getLLMVoiceResponse).toHaveBeenCalledWith(mockFile);
    });
  });
});