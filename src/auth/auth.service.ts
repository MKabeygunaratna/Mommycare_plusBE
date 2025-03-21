import { Injectable, ConflictException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './signup.dto';
import { FirebaseService } from '../firebase/firebase.service';  // Assuming FirebaseService is set up

@Injectable()
export class AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  private user: any = null;

  // Login logic - For now, it uses a mock user from Firestore, you can add JWT later
  async login(user: any) {
    this.user = user;
    return { message: 'User authenticated', user };
  }

  // Signup logic to register a new user
  async signup(signupDto: SignupDto) {
  const { name, email, password } = signupDto;

  // Access Firestore
  const db = this.firebaseService.getDb();
  const userRef = db.collection('users');
  
  // Check if the user already exists in Firestore
  const existingUserSnapshot = await userRef.where('email', '==', email).get();
  if (!existingUserSnapshot.empty) {
    throw new ConflictException('Email already exists');
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the new user
  const newUser = {
    name,
    email,
    password: hashedPassword,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  // Add the new user to Firestore and get the document reference
  const userDocRef = await userRef.add(newUser);

  // Get the auto-generated user ID (doc.id)
  const userId = userDocRef.id;

  // Update the user document with the userId field
  await userDocRef.update({ userId });

  return { message: 'Signup successful', userId };
}



  // Retrieve the current access token (if needed)
  getAccessToken(): string | null {
    return this.user ? this.user.accessToken : null;
  }
}
