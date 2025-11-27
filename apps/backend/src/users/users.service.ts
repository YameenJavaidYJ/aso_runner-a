import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '@alain/database';
import {
  user,
  userRoles,
  riders,
  vendors,
  customers,
  admins,
  type User,
  type NewUser,
} from '@alain/database';
import { eq, and, desc, sql } from 'drizzle-orm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  async findOne(id: string): Promise<User> {
    const [foundUser] = await db
      .select()
      .from(user)
      .where(eq(user.id, id));

    if (!foundUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return foundUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const [foundUser] = await db
      .select()
      .from(user)
      .where(eq(user.id, id));

    if (!foundUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updateData: Partial<NewUser> = {
      updatedAt: new Date(),
    };

    if (updateUserDto.name !== undefined) {
      updateData.name = updateUserDto.name;
    }
    if (updateUserDto.phone !== undefined) {
      updateData.phone = updateUserDto.phone || null;
    }
    if (updateUserDto.phoneVerified !== undefined) {
      updateData.phoneVerified = updateUserDto.phoneVerified;
    }
    if (updateUserDto.status !== undefined) {
      updateData.status = updateUserDto.status;
    }
    if (updateUserDto.language !== undefined) {
      updateData.language = updateUserDto.language || null;
    }
    if (updateUserDto.currency !== undefined) {
      updateData.currency = updateUserDto.currency || null;
    }
    if (updateUserDto.profilePicture !== undefined) {
      updateData.profilePicture = updateUserDto.profilePicture || null;
    }

    const [updatedUser] = await db
      .update(user)
      .set(updateData)
      .where(eq(user.id, id))
      .returning();

    return updatedUser;
  }

  async updateLastLogin(id: string): Promise<void> {
    await db
      .update(user)
      .set({ lastLoginAt: new Date(), updatedAt: new Date() })
      .where(eq(user.id, id));
  }

  async getUserWithRoles(userId: string): Promise<{
    user: User;
    roles: Array<{
      id: string;
      role: string;
      assignedAt: Date;
      assignedBy: string | null;
    }>;
    profiles: {
      rider?: unknown;
      vendor?: unknown;
      customer?: unknown;
      admin?: unknown;
    };
  }> {
    const [foundUser] = await db
      .select()
      .from(user)
      .where(eq(user.id, userId));

    if (!foundUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const roles = await db
      .select()
      .from(userRoles)
      .where(eq(userRoles.userId, userId))
      .orderBy(desc(userRoles.assignedAt));

    const profiles: {
      rider?: unknown;
      vendor?: unknown;
      customer?: unknown;
      admin?: unknown;
    } = {};

    // Fetch profiles based on roles
    const roleNames = roles.map((r) => r.role);

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

    return {
      user: foundUser,
      roles: roles.map((r) => ({
        id: r.id,
        role: r.role,
        assignedAt: r.assignedAt,
        assignedBy: r.assignedBy,
      })),
      profiles,
    };
  }

  async findAll(query?: {
    status?: string;
    role?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    data: User[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const page = query?.page || 1;
    const limit = query?.limit || 10;
    const offset = (page - 1) * limit;

    // Simple implementation - can be enhanced with joins for role filtering
    const data = await db
      .select()
      .from(user)
      .orderBy(desc(user.createdAt))
      .limit(limit)
      .offset(offset);

    const totalResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(user);

    const total = Number(totalResult[0]?.count || 0);
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
  }
}

