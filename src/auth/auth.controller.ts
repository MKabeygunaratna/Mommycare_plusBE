import { Controller, Post, Body, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './signup.dto';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Signup route
  @Post('signup')
  async signup(@Body() signupDto: SignupDto, @Res() res: Response) {
    try {
      const response = await this.authService.signup(signupDto);
      return res.status(201).json(response);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  // Login route
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      const response = await this.authService.login(loginDto);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }
}