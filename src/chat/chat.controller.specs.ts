import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

describe('ChatController', () => {
  let controller: ChatController;
  let chatService: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [
        {
          provide: ChatService,
          useValue: {
            sendMessagetoSave2: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ChatController>(ChatController);
    chatService = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('sendMessage', () => {
    it('should call chatService.sendMessagetoSave2 with correct parameters', async () => {
      // Arrange
      const messageData = {
        userId: 'user123',
        username: 'testUser',
        message: 'Hello, this is a test message'
      };
      
      const expectedResponse = {
        success: true,
        message: 'Message sent successfully'
      };
      
      jest.spyOn(chatService, 'sendMessagetoSave2').mockResolvedValue(expectedResponse);
      
      // Act
      const result = await controller.sendMessage(messageData);
      
      // Assert
      expect(chatService.sendMessagetoSave2).toHaveBeenCalledWith(
        messageData.userId,
        messageData.username,
        messageData.message
      );
      expect(result).toEqual(expectedResponse);
    });

    it('should propagate errors from the chat service', async () => {
      // Arrange
      const messageData = {
        userId: 'user123',
        username: 'testUser',
        message: 'Test message'
      };
      
      const error = new Error('Failed to send message');
      jest.spyOn(chatService, 'sendMessagetoSave2').mockRejectedValue(error);
      
      // Act & Assert
      await expect(controller.sendMessage(messageData)).rejects.toThrow(error);
      expect(chatService.sendMessagetoSave2).toHaveBeenCalledWith(
        messageData.userId,
        messageData.username,
        messageData.message
      );
    });
  });
});