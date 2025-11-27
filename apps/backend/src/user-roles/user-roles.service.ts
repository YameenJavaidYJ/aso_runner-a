import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { db } from '@alain/database';
import {
  userRoles,
  user,
  riders,
  vendors,
  customers,
  admins,
  type UserRole as UserRoleType,
  type NewUserRole,
} from '@alain/database';
import { eq, and } from 'drizzle-orm';
import { AddRoleDto, UserRole as UserRoleEnum } from './dto/add-role.dto';

@Injectable()
export class UserRolesService {
  async addRole(
    userId: string,
    role: UserRoleEnum,
    assignedBy?: string
  ): Promise<UserRoleType> {
    // Check if user exists
    const [foundUser] = await db
      .select()
      .from(user)
      .where(eq(user.id, userId));

    if (!foundUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Check if role already exists
    const [existingRole] = await db
      .select()
      .from(userRoles)
      .where(and(eq(userRoles.userId, userId), eq(userRoles.role, role)));

    if (existingRole) {
      throw new ConflictException(
        `User already has the role: ${role}`
      );
    }

    // Add role
    const [newRole] = await db
      .insert(userRoles)
      .values({
        userId,
        role,
        assignedBy: assignedBy || null,
      })
      .returning();

    // Create corresponding profile if needed
    await this.createProfileForRole(userId, role);

    return newRole;
  }

  async removeRole(userId: string, role: UserRoleEnum): Promise<void> {
    const [existingRole] = await db
      .select()
      .from(userRoles)
      .where(and(eq(userRoles.userId, userId), eq(userRoles.role, role)));

    if (!existingRole) {
      throw new NotFoundException(
        `User does not have the role: ${role}`
      );
    }

    await db
      .delete(userRoles)
      .where(and(eq(userRoles.userId, userId), eq(userRoles.role, role)));

    // Optionally delete profile (or keep it for historical data)
    // await this.deleteProfileForRole(userId, role);
  }

  async getUserRoles(userId: string): Promise<UserRoleType[]> {
    const [foundUser] = await db
      .select()
      .from(user)
      .where(eq(user.id, userId));

    if (!foundUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return db
      .select()
      .from(userRoles)
      .where(eq(userRoles.userId, userId));
  }

  async hasRole(userId: string, role: UserRoleEnum): Promise<boolean> {
    const [userRole] = await db
      .select()
      .from(userRoles)
      .where(and(eq(userRoles.userId, userId), eq(userRoles.role, role)));

    return !!userRole;
  }

  async hasAnyRole(userId: string, roles: UserRoleEnum[]): Promise<boolean> {
    const userRolesList = await this.getUserRoles(userId);
    const userRoleNames = userRolesList.map((r) => r.role);
    return roles.some((role) => userRoleNames.includes(role));
  }

  private async createProfileForRole(
    userId: string,
    role: UserRoleEnum
  ): Promise<void> {
    switch (role) {
      case UserRoleEnum.RIDER:
        // Check if rider profile already exists
        const [existingRider] = await db
          .select()
          .from(riders)
          .where(eq(riders.userId, userId));
        if (!existingRider) {
          // Get user name for fullName
          const [foundUser] = await db
            .select()
            .from(user)
            .where(eq(user.id, userId));
          await db.insert(riders).values({
            userId,
            fullName: foundUser?.name || 'Unknown',
          });
        }
        break;

      case UserRoleEnum.VENDOR:
        const [existingVendor] = await db
          .select()
          .from(vendors)
          .where(eq(vendors.userId, userId));
        if (!existingVendor) {
          const [foundUser] = await db
            .select()
            .from(user)
            .where(eq(user.id, userId));
          await db.insert(vendors).values({
            userId,
            businessName: foundUser?.name || 'Business',
            ownerName: foundUser?.name || 'Owner',
          });
        }
        break;

      case UserRoleEnum.CUSTOMER:
        const [existingCustomer] = await db
          .select()
          .from(customers)
          .where(eq(customers.userId, userId));
        if (!existingCustomer) {
          await db.insert(customers).values({
            userId,
          });
        }
        break;

      case UserRoleEnum.ADMIN:
      case UserRoleEnum.SUPPORT_ADMIN:
      case UserRoleEnum.FINANCE_ADMIN:
        const [existingAdmin] = await db
          .select()
          .from(admins)
          .where(eq(admins.userId, userId));
        if (!existingAdmin) {
          await db.insert(admins).values({
            userId,
          });
        }
        break;
    }
  }
}

