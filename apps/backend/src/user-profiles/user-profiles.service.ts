import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '@alain/database';
import {
  riders,
  vendors,
  customers,
  admins,
  userRoles,
} from '@alain/database';
import { eq, and } from 'drizzle-orm';
import { UserRole as UserRoleEnum } from '../user-roles/dto/add-role.dto';

@Injectable()
export class UserProfilesService {
  async getAllProfiles(userId: string): Promise<{
    rider?: unknown;
    vendor?: unknown;
    customer?: unknown;
    admin?: unknown;
  }> {
    // Get user roles
    const roles = await db
      .select()
      .from(userRoles)
      .where(eq(userRoles.userId, userId));

    const roleNames = roles.map((r) => r.role);
    const profiles: {
      rider?: unknown;
      vendor?: unknown;
      customer?: unknown;
      admin?: unknown;
    } = {};

    if (roleNames.includes('rider')) {
      const [rider] = await db
        .select()
        .from(riders)
        .where(eq(riders.userId, userId));
      if (rider) profiles.rider = rider;
    }

    if (roleNames.includes('vendor')) {
      const [vendor] = await db
        .select()
        .from(vendors)
        .where(eq(vendors.userId, userId));
      if (vendor) profiles.vendor = vendor;
    }

    if (roleNames.includes('customer')) {
      const [customer] = await db
        .select()
        .from(customers)
        .where(eq(customers.userId, userId));
      if (customer) profiles.customer = customer;
    }

    if (
      roleNames.includes('admin') ||
      roleNames.includes('support_admin') ||
      roleNames.includes('finance_admin')
    ) {
      const [admin] = await db
        .select()
        .from(admins)
        .where(eq(admins.userId, userId));
      if (admin) profiles.admin = admin;
    }

    return profiles;
  }

  async getProfileByRole(
    userId: string,
    role: UserRoleEnum
  ): Promise<unknown | null> {
    // Verify user has this role
    const [userRole] = await db
      .select()
      .from(userRoles)
      .where(and(eq(userRoles.userId, userId), eq(userRoles.role, role)));

    if (!userRole) {
      throw new NotFoundException(
        `User does not have the role: ${role}`
      );
    }

    switch (role) {
      case UserRoleEnum.RIDER: {
        const [rider] = await db
          .select()
          .from(riders)
          .where(eq(riders.userId, userId));
        return rider || null;
      }

      case UserRoleEnum.VENDOR: {
        const [vendor] = await db
          .select()
          .from(vendors)
          .where(eq(vendors.userId, userId));
        return vendor || null;
      }

      case UserRoleEnum.CUSTOMER: {
        const [customer] = await db
          .select()
          .from(customers)
          .where(eq(customers.userId, userId));
        return customer || null;
      }

      case UserRoleEnum.ADMIN:
      case UserRoleEnum.SUPPORT_ADMIN:
      case UserRoleEnum.FINANCE_ADMIN: {
        const [admin] = await db
          .select()
          .from(admins)
          .where(eq(admins.userId, userId));
        return admin || null;
      }

      default:
        return null;
    }
  }
}

