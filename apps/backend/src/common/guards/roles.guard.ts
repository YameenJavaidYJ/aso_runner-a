import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { db } from '@alain/database';
import { userRoles } from '@alain/database';
import { eq } from 'drizzle-orm';
import { UserRole } from '../../user-roles/dto/add-role.dto';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id || request.query?.userId;

    if (!userId) {
      throw new ForbiddenException('User not authenticated');
    }

    // Get user roles from database
    const userRolesList = await db
      .select()
      .from(userRoles)
      .where(eq(userRoles.userId, userId));

    const userRoleNames = userRolesList.map((r) => r.role as UserRoleEnum);

    // Check if user has at least one of the required roles
    const hasRole = requiredRoles.some((role) =>
      userRoleNames.includes(role)
    );

    if (!hasRole) {
      throw new ForbiddenException(
        `Insufficient permissions. Required roles: ${requiredRoles.join(', ')}`
      );
    }

    return true;
  }
}

