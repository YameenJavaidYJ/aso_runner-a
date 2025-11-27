import { Injectable } from '@nestjs/common';
import { auth } from './auth.config';

@Injectable()
export class AuthService {
  getAuth() {
    return auth;
  }
}

