import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Redirects to Google OAuth
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    const jwtToken = this.authService.login(user); // Login method should return the JWT token

    // Store the JWT token in a cookie
    res.cookie('access_token', jwtToken, {
      httpOnly: true, // Can't be accessed from JavaScript (security)
      secure: process.env.NODE_ENV === 'production', // Only set secure cookies in production
      maxAge: 3600000, // Set cookie expiration time (1 hour)
    });

    res.redirect('/some-page'); // Redirect the user to a specific page after successful login
  }

  @Get('token')
  getToken(@Req() req: Request) {
    const token = req.cookies['access_token'];
    return { accessToken: token };
  }
}
