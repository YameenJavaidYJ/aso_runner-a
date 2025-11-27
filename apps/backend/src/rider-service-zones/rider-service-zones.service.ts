import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '@alain/database';
import {
  riderServiceZones,
  type RiderServiceZone,
  type NewRiderServiceZone,
} from '@alain/database';
import { eq, and, desc } from 'drizzle-orm';
import { CreateRiderServiceZoneDto } from './dto/create-rider-service-zone.dto';

@Injectable()
export class RiderServiceZonesService {
  async create(
    createRiderServiceZoneDto: CreateRiderServiceZoneDto
  ): Promise<RiderServiceZone> {
    const [serviceZone] = await db
      .insert(riderServiceZones)
      .values({
        riderId: createRiderServiceZoneDto.riderId,
        deliveryZoneId: createRiderServiceZoneDto.deliveryZoneId,
        isPreferred: createRiderServiceZoneDto.isPreferred || false,
      })
      .returning();

    return serviceZone;
  }

  async findAll(riderId?: string): Promise<RiderServiceZone[]> {
    if (riderId) {
      return db
        .select()
        .from(riderServiceZones)
        .where(eq(riderServiceZones.riderId, riderId))
        .orderBy(desc(riderServiceZones.createdAt));
    }

    return db
      .select()
      .from(riderServiceZones)
      .orderBy(desc(riderServiceZones.createdAt));
  }

  async findOne(id: string): Promise<RiderServiceZone> {
    const [serviceZone] = await db
      .select()
      .from(riderServiceZones)
      .where(eq(riderServiceZones.id, id));

    if (!serviceZone) {
      throw new NotFoundException(
        `Rider service zone with ID ${id} not found`
      );
    }

    return serviceZone;
  }

  async remove(id: string): Promise<void> {
    const [serviceZone] = await db
      .select()
      .from(riderServiceZones)
      .where(eq(riderServiceZones.id, id));

    if (!serviceZone) {
      throw new NotFoundException(
        `Rider service zone with ID ${id} not found`
      );
    }

    await db.delete(riderServiceZones).where(eq(riderServiceZones.id, id));
  }

  async findByRiderId(riderId: string): Promise<RiderServiceZone[]> {
    return db
      .select()
      .from(riderServiceZones)
      .where(eq(riderServiceZones.riderId, riderId))
      .orderBy(desc(riderServiceZones.createdAt));
  }

  async updatePreferred(
    id: string,
    isPreferred: boolean
  ): Promise<RiderServiceZone> {
    const [serviceZone] = await db
      .select()
      .from(riderServiceZones)
      .where(eq(riderServiceZones.id, id));

    if (!serviceZone) {
      throw new NotFoundException(
        `Rider service zone with ID ${id} not found`
      );
    }

    const [updated] = await db
      .update(riderServiceZones)
      .set({ isPreferred })
      .where(eq(riderServiceZones.id, id))
      .returning();

    return updated;
  }
}

