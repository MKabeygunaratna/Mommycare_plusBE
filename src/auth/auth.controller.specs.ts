import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignupDto } from './signup.dto';
import { LoginDto } from './login.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let mockResponse: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signup: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);

    // Mock Express response
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signup', () => {
    it('should return 201 with user data when signup is successful', async () => {
      const signupDto: SignupDto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };
      
      const mockUser = { 
        message: 'User created successfully', 
        userId: 'user-id', 
        email: signupDto.email 
      };
      
      jest.spyOn(authService, 'signup').mockResolvedValue(mockUser);
      
      await controller.signup(signupDto, mockResponse);
      
      expect(authService.signup).toHaveBeenCalledWith(signupDto);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return 400 when signup fails', async () => {
      const signupDto: SignupDto = {
        email: 'existing@example.com',
        password: 'password123',
        name: 'Test User',
      };
      
      const errorMessage = 'Email already exists';
      jest.spyOn(authService, 'signup').mockRejectedValue(new Error(errorMessage));
      
      await controller.signup(signupDto, mockResponse);
      
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('login', () => {
    it('should return 200 with token when login is successful', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      
      const mockAuthResponse = {
        user: { 
          id: 'user-id', 
          email: 'test@example.com'
        },
        accessToken: 'jwt-token'
      };
      
      jest.spyOn(authService, 'login').mockResolvedValue(mockAuthResponse);
      
      await controller.login(loginDto, mockResponse);
      
      expect(authService.login).toHaveBeenCalledWith(loginDto);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockAuthResponse);
    });

    it('should return 401 when login fails', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };
      
      const errorMessage = 'Invalid credentials';
      jest.spyOn(authService, 'login').mockRejectedValue(new Error(errorMessage));
      
      await controller.login(loginDto, mockResponse);
      
      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
});