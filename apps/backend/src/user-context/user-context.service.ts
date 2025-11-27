import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { db } from '@alain/database';
import { userRoles } from '@alain/database';
import { eq, and } from 'drizzle-orm';
import { UserRole as UserRoleEnum } from '../user-roles/dto/add-role.dto';

/**
 * Service for managing user's active role context
 * In a real implementation, this would use Redis or session storage
 * For now, we'll use a simple in-memory store (replace with Redis in production)
 */
@Injectable()
export class UserContextService {
  // In-memory store for active roles (replace with Redis in production)
  private activeRoles: Map<string, UserRoleEnum> = new Map();

  async setActiveRole(userId: string, role: UserRoleEnum): Promise<UserRoleEnum> {
    // Verify user has this role
    const [userRole] = await db
      .select()
      .from(userRoles)
      .where(and(eq(userRoles.userId, userId), eq(userRoles.role, role)));

    if (!userRole) {
      throw new BadRequestException(
        `User does not have the role: ${role}. Please request this role first.`
      );
    }

    this.activeRoles.set(userId, role);
    return role;
  }

  async getActiveRole(userId: string): Promise<UserRoleEnum | null> {
    return this.activeRoles.get(userId) || null;
  }

  async clearActiveRole(userId: string): Promise<void> {
    this.activeRoles.delete(userId);
  }

  async getUserRoles(userId: string): Promise<UserRoleEnum[]> {
    const roles = await db
      .select()
      .from(userRoles)
      .where(eq(userRoles.userId, userId));

    return roles.map((r) => r.role as UserRoleEnum);
  }
}

