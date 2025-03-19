import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private user: any = null;

  login(user: any) {
    this.user = user;
    return { message: 'User authenticated', user };
  }

  getAccessToken(): string | null {
    return this.user ? this.user.accessToken : null;
  }
}
