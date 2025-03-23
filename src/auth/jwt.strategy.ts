// strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private firebaseService: FirebaseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });
  }

  async validate(payload: any) {
    const db = this.firebaseService.getDb();
    const userSnapshot = await db
      .collection('users')
      .where('email', '==', payload.email)
      .get();

    if (userSnapshot.empty) {
      return null;
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();
    
    // Don't include password in the returned user
    const { password, ...userWithoutPassword } = userData;
    
    return {
      id: userDoc.id,
      ...userWithoutPassword,
    };
  }
}