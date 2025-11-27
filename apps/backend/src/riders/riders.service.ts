import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '@alain/database';
import { riders, type Rider, type NewRider } from '@alain/database';
import { eq, and, or, ilike, desc, asc, sql } from 'drizzle-orm';
import { CreateRiderDto } from './dto/create-rider.dto';
import { UpdateRiderDto } from './dto/update-rider.dto';
import { RiderQueryDto } from './dto/rider-query.dto';

@Injectable()
export class RidersService {
  async create(createRiderDto: CreateRiderDto): Promise<Rider> {
    const [rider] = await db
      .insert(riders)
      .values({
        userId: createRiderDto.userId,
        fullName: createRiderDto.fullName,
        dateOfBirth: createRiderDto.dateOfBirth || null,
        emergencyContactName: createRiderDto.emergencyContactName || null,
        emergencyContactPhone: createRiderDto.emergencyContactPhone || null,
        currentLatitude: createRiderDto.currentLatitude || null,
        currentLongitude: createRiderDto.currentLongitude || null,
      })
      .returning();

    return rider;
  }

  async findAll(query: RiderQueryDto): Promise<{
    data: Rider[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const offset = (page - 1) * limit;

    const conditions = [];

    if (query.search) {
      conditions.push(ilike(riders.fullName, `%${query.search}%`));
    }

    if (query.verificationStatus) {
      conditions.push(eq(riders.verificationStatus, query.verificationStatus));
    }

    if (query.isOnline !== undefined) {
      conditions.push(eq(riders.isOnline, query.isOnline));
    }

    const whereClause =
      conditions.length > 0 ? and(...conditions) : undefined;

    const orderBy =
      query.sortOrder === 'asc'
        ? asc(riders[query.sortBy as keyof typeof riders] || riders.createdAt)
        : desc(riders[query.sortBy as keyof typeof riders] || riders.createdAt);

    const [data, totalResult] = await Promise.all([
      db
        .select()
        .from(riders)
        .where(whereClause)
        .orderBy(orderBy)
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(riders)
        .where(whereClause),
    ]);

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

  async findOne(id: string): Promise<Rider> {
    const [rider] = await db.select().from(riders).where(eq(riders.id, id));

    if (!rider) {
      throw new NotFoundException(`Rider with ID ${id} not found`);
    }

    return rider;
  }

  async update(id: string, updateRiderDto: UpdateRiderDto): Promise<Rider> {
    const [rider] = await db
      .select()
      .from(riders)
      .where(eq(riders.id, id));

    if (!rider) {
      throw new NotFoundException(`Rider with ID ${id} not found`);
    }

    const updateData: Partial<NewRider> = {
      updatedAt: new Date(),
    };

    if (updateRiderDto.fullName !== undefined) {
      updateData.fullName = updateRiderDto.fullName;
    }
    if (updateRiderDto.dateOfBirth !== undefined) {
      updateData.dateOfBirth = updateRiderDto.dateOfBirth || null;
    }
    if (updateRiderDto.emergencyContactName !== undefined) {
      updateData.emergencyContactName =
        updateRiderDto.emergencyContactName || null;
    }
    if (updateRiderDto.emergencyContactPhone !== undefined) {
      updateData.emergencyContactPhone =
        updateRiderDto.emergencyContactPhone || null;
    }
    if (updateRiderDto.verificationStatus !== undefined) {
      updateData.verificationStatus = updateRiderDto.verificationStatus;
    }
    if (updateRiderDto.isOnline !== undefined) {
      updateData.isOnline = updateRiderDto.isOnline;
      if (updateRiderDto.isOnline) {
        updateData.lastOnlineAt = new Date();
      }
    }
    if (updateRiderDto.rating !== undefined) {
      updateData.rating = updateRiderDto.rating;
    }
    if (updateRiderDto.totalRatings !== undefined) {
      updateData.totalRatings = updateRiderDto.totalRatings;
    }
    if (updateRiderDto.totalDeliveries !== undefined) {
      updateData.totalDeliveries = updateRiderDto.totalDeliveries;
    }
    if (updateRiderDto.acceptanceRate !== undefined) {
      updateData.acceptanceRate = updateRiderDto.acceptanceRate;
    }
    if (updateRiderDto.onTimeRate !== undefined) {
      updateData.onTimeRate = updateRiderDto.onTimeRate;
    }
    if (updateRiderDto.cancellationRate !== undefined) {
      updateData.cancellationRate = updateRiderDto.cancellationRate;
    }
    if (updateRiderDto.currentLatitude !== undefined) {
      updateData.currentLatitude = updateRiderDto.currentLatitude || null;
    }
    if (updateRiderDto.currentLongitude !== undefined) {
      updateData.currentLongitude = updateRiderDto.currentLongitude || null;
    }

    const [updatedRider] = await db
      .update(riders)
      .set(updateData)
      .where(eq(riders.id, id))
      .returning();

    return updatedRider;
  }

  async remove(id: string): Promise<void> {
    const [rider] = await db
      .select()
      .from(riders)
      .where(eq(riders.id, id));

    if (!rider) {
      throw new NotFoundException(`Rider with ID ${id} not found`);
    }

    await db.delete(riders).where(eq(riders.id, id));
  }

  async findByUserId(userId: string): Promise<Rider | null> {
    const [rider] = await db
      .select()
      .from(riders)
      .where(eq(riders.userId, userId));

    return rider || null;
  }
}

