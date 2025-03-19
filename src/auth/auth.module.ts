import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy'; // Make sure the GoogleStrategy is correctly imported

@Module({
  imports: [  
    PassportModule.register({ defaultStrategy: 'google' }), // Add PassportModule
    JwtModule.register({ // Register JwtModule
      secret: process.env.JWT_SECRET || 'defaultSecret', // Add your secret here
      signOptions: { expiresIn: '60m' }, // Add token expiration time
    }),
  ],
  providers: [AuthService, GoogleStrategy], // Add JwtService as a provider
  controllers: [AuthController],
})
export class AuthModule {}
