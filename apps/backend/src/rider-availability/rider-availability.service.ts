import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '@alain/database';
import {
  riderAvailability,
  type RiderAvailability,
  type NewRiderAvailability,
} from '@alain/database';
import { eq } from 'drizzle-orm';
import { CreateRiderAvailabilityDto } from './dto/create-rider-availability.dto';
import { UpdateRiderAvailabilityDto } from './dto/update-rider-availability.dto';

@Injectable()
export class RiderAvailabilityService {
  async create(
    createRiderAvailabilityDto: CreateRiderAvailabilityDto
  ): Promise<RiderAvailability> {
    // Check if availability record already exists for this rider
    const [existing] = await db
      .select()
      .from(riderAvailability)
      .where(eq(riderAvailability.riderId, createRiderAvailabilityDto.riderId));

    if (existing) {
      // Update existing record
      const [updated] = await db
        .update(riderAvailability)
        .set({
          isAvailable: createRiderAvailabilityDto.isAvailable,
          latitude: createRiderAvailabilityDto.latitude || null,
          longitude: createRiderAvailabilityDto.longitude || null,
          lastUpdatedAt: new Date(),
        })
        .where(eq(riderAvailability.riderId, createRiderAvailabilityDto.riderId))
        .returning();

      return updated;
    }

    // Create new record
    const [availability] = await db
      .insert(riderAvailability)
      .values({
        riderId: createRiderAvailabilityDto.riderId,
        isAvailable: createRiderAvailabilityDto.isAvailable,
        latitude: createRiderAvailabilityDto.latitude || null,
        longitude: createRiderAvailabilityDto.longitude || null,
      })
      .returning();

    return availability;
  }

  async findAll(): Promise<RiderAvailability[]> {
    return db.select().from(riderAvailability);
  }

  async findOne(id: string): Promise<RiderAvailability> {
    const [availability] = await db
      .select()
      .from(riderAvailability)
      .where(eq(riderAvailability.id, id));

    if (!availability) {
      throw new NotFoundException(
        `Rider availability with ID ${id} not found`
      );
    }

    return availability;
  }

  async findByRiderId(riderId: string): Promise<RiderAvailability | null> {
    const [availability] = await db
      .select()
      .from(riderAvailability)
      .where(eq(riderAvailability.riderId, riderId));

    return availability || null;
  }

  async update(
    id: string,
    updateRiderAvailabilityDto: UpdateRiderAvailabilityDto
  ): Promise<RiderAvailability> {
    const [availability] = await db
      .select()
      .from(riderAvailability)
      .where(eq(riderAvailability.id, id));

    if (!availability) {
      throw new NotFoundException(
        `Rider availability with ID ${id} not found`
      );
    }

    const updateData: Partial<NewRiderAvailability> = {
      lastUpdatedAt: new Date(),
    };

    if (updateRiderAvailabilityDto.isAvailable !== undefined) {
      updateData.isAvailable = updateRiderAvailabilityDto.isAvailable;
    }
    if (updateRiderAvailabilityDto.latitude !== undefined) {
      updateData.latitude = updateRiderAvailabilityDto.latitude || null;
    }
    if (updateRiderAvailabilityDto.longitude !== undefined) {
      updateData.longitude = updateRiderAvailabilityDto.longitude || null;
    }

    const [updated] = await db
      .update(riderAvailability)
      .set(updateData)
      .where(eq(riderAvailability.id, id))
      .returning();

    return updated;
  }

  async updateByRiderId(
    riderId: string,
    updateRiderAvailabilityDto: UpdateRiderAvailabilityDto
  ): Promise<RiderAvailability> {
    const [availability] = await db
      .select()
      .from(riderAvailability)
      .where(eq(riderAvailability.riderId, riderId));

    if (!availability) {
      throw new NotFoundException(
        `Rider availability for rider ID ${riderId} not found`
      );
    }

    return this.update(availability.id, updateRiderAvailabilityDto);
  }

  async remove(id: string): Promise<void> {
    const [availability] = await db
      .select()
      .from(riderAvailability)
      .where(eq(riderAvailability.id, id));

    if (!availability) {
      throw new NotFoundException(
        `Rider availability with ID ${id} not found`
      );
    }

    await db.delete(riderAvailability).where(eq(riderAvailability.id, id));
  }
}

