import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // Import JwtService to handle token generation

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(user: any) {
    const payload = { email: user.email, googleId: user.googleId }; // or whatever data you need in the payload
    return this.jwtService.sign(payload); // Generate and return the JWT token
  }

  validateToken(token: string) {
    try {
      return this.jwtService.verify(token); // Verify the token
    } catch (e) {
      return null; // Return null if the token is invalid
    }
  }
}
