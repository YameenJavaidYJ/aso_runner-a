import { Injectable } from '@nestjs/common';
import { auth } from './auth.config';
import { db } from '@alain/database';
import { user } from '@alain/database';
import { eq } from 'drizzle-orm';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  getAuth() {
    return auth;
  }

  /**
   * Update last login timestamp after successful authentication
   */
  async updateLastLogin(userId: string): Promise<void> {
    await this.usersService.updateLastLogin(userId);
  }

  /**
   * Get user session with roles
   * This can be called after BetterAuth authentication
   */
  async getUserSession(userId: string) {
    const userData = await this.usersService.getUserWithRoles(userId);
    return userData;
  }
}
