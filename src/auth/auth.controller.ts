import { Controller, Post, Body, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { SignupDto } from './signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Google OAuth login
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Redirects to Google OAuth
  }

  // Google OAuth callback
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    const response = this.authService.login(user);
    res.json(response);
  }

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

  // Token retrieval
  @Get('token')
  getToken() {
    return { accessToken: this.authService.getAccessToken() };
  }
}
