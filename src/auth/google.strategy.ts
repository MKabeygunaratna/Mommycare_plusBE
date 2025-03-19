import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptions } from 'passport-google-oauth20';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['profile', 'email', 'https://www.googleapis.com/auth/fitness.sleep.read'],
    } as StrategyOptions); // ✅ Explicitly define StrategyOptions
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    return {
      googleId: profile.id,
      displayName: profile.displayName,
      email: profile.emails[0].value,
      accessToken: accessToken,
    };
  }
}
