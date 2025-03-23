import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as admin from 'firebase-admin';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './signup.dto';
import { LoginDto } from './login.dto';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly jwtService: JwtService,
  ) {}

  // Generate JWT token
  generateToken(payload: any): string {
    return this.jwtService.sign(payload);
  }

  // Login with email and password
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const db = this.firebaseService.getDb();
    const userRef = db.collection('users');
    const userSnapshot = await userRef.where('email', '==', email).get();

    if (userSnapshot.empty) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();
    const passwordMatch = await bcrypt.compare(password, userData.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, email: userEmail, ...userWithoutPassword } = userData;
    const user = {
      id: userDoc.id,
      email: userEmail,
      ...userWithoutPassword,
    };

    const accessToken = this.generateToken({ sub: user.id, email: user.email });

    return {
      user,
      accessToken,
    };
  }

  // Signup new user
  async signup(signupDto: SignupDto) {
    const { name, email, password } = signupDto;
    const db = this.firebaseService.getDb();
    const userRef = db.collection('users');

    const existingUserSnapshot = await userRef.where('email', '==', email).get();
    if (!existingUserSnapshot.empty) {
      throw new ConflictException('Email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const userDocRef = await userRef.add(newUser);
    const userId = userDocRef.id;
    await userDocRef.update({ userId });

    return { 
      message: 'Signup successful', 
      userId, 
      email
    };
  }
}