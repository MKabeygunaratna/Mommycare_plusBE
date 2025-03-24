import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe('TodoController', () => {
  let controller: TodoController;
  let todoService: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: {
            savetodolist: jest.fn(),
            getTasks: jest.fn(),
            markTaskAsDone: jest.fn(),
            deleteTask: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    todoService = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addTask', () => {
    it('should call todoService.savetodolist with the correct parameters', async () => {
      // Arrange
      const taskData = {
        title: 'Take prenatal vitamins',
        description: 'Take vitamins daily with breakfast',
        date: '2023-05-01',
        isRecurring: true
      };
      
      const expectedResponse = {
        success: true,
        message: 'Task added successfully'
      };
      
      jest.spyOn(todoService, 'savetodolist').mockResolvedValue(expectedResponse);
      
      // Act
      const result = await controller.addTask(taskData);
      
      // Assert
      expect(todoService.savetodolist).toHaveBeenCalledWith(
        taskData.title,
        taskData.description,
        taskData.date,
        taskData.isRecurring
      );
      expect(result).toEqual(expectedResponse);
    });

    it('should propagate errors from the todo service during task creation', async () => {
      // Arrange
      const taskData = {
        title: 'Invalid task',
        description: 'This will fail',
        date: '2023-05-01',
        isRecurring: true
      };
      
      const error = new Error('Failed to add task');
      jest.spyOn(todoService, 'savetodolist').mockRejectedValue(error);
      
      // Act & Assert
      await expect(controller.addTask(taskData)).rejects.toThrow(error);
    });
  });

  describe('getTasks', () => {
    it('should call todoService.getTasks and return all tasks', async () => {
      // Arrange
      // Updated to match the actual return type
      const expectedTasks = {
        success: true,
        todoLists: [
          {
            id: 'task1',
            title: 'Take prenatal vitamins',
            description: 'Take vitamins daily with breakfast',
            date: '2023-05-01',
            isRecurring: true,
            completed: false
          },
          {
            id: 'task2',
            title: 'Doctor appointment',
            description: 'Checkup with Dr. Smith',
            date: '2023-05-15',
            isRecurring: false,
            completed: true
          }
        ]
      };
      
      jest.spyOn(todoService, 'getTasks').mockResolvedValue(expectedTasks);
      
      // Act
      const result = await controller.getTasks();
      
      // Assert
      expect(todoService.getTasks).toHaveBeenCalled();
      expect(result).toEqual(expectedTasks);
    });

    it('should handle case when no todo lists are found', async () => {
      // Arrange
      const expectedResponse = {
        success: false,
        message: 'No todo lists found'
      };
      
      jest.spyOn(todoService, 'getTasks').mockResolvedValue(expectedResponse);
      
      // Act
      const result = await controller.getTasks();
      
      // Assert
      expect(todoService.getTasks).toHaveBeenCalled();
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('markTaskAsDone', () => {
    it('should call todoService.markTaskAsDone with the correct title', async () => {
      // Arrange
      const title = 'Take prenatal vitamins';
      const expectedResponse = {
        success: true,
        message: 'Task marked as done'
      };
      
      jest.spyOn(todoService, 'markTaskAsDone').mockResolvedValue(expectedResponse);
      
      // Act
      const result = await controller.markTaskAsDone(title);
      
      // Assert
      expect(todoService.markTaskAsDone).toHaveBeenCalledWith(title);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('deleteTask', () => {
    it('should call todoService.deleteTask with the correct title', async () => {
      // Arrange
      const title = 'Take prenatal vitamins';
      const expectedResponse = {
        success: true,
        message: 'Task deleted successfully'
      };
      
      jest.spyOn(todoService, 'deleteTask').mockResolvedValue(expectedResponse);
      
      // Act
      const result = await controller.deleteTask(title);
      
      // Assert
      expect(todoService.deleteTask).toHaveBeenCalledWith(title);
      expect(result).toEqual(expectedResponse);
    });
  });
});