import { SetMetadata } from '@nestjs/common';
import { UserRole as UserRoleEnum } from '../../user-roles/dto/add-role.dto';

export const ROLES_KEY = 'roles';

/**
 * Decorator to specify required roles for a route
 * Usage: @Roles(UserRole.ADMIN, UserRole.SUPPORT_ADMIN)
 */
export const Roles = (...roles: UserRoleEnum[]) => SetMetadata(ROLES_KEY, roles);

