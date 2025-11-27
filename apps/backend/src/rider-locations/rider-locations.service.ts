import { Injectable } from '@nestjs/common';
import { db } from '@alain/database';
import {
  riderLocations,
  type RiderLocation,
  type NewRiderLocation,
} from '@alain/database';
import { eq, desc } from 'drizzle-orm';
import { CreateRiderLocationDto } from './dto/create-rider-location.dto';
import { RiderLocationQueryDto } from './dto/rider-location-query.dto';

@Injectable()
export class RiderLocationsService {
  async create(
    createRiderLocationDto: CreateRiderLocationDto
  ): Promise<RiderLocation> {
    const [location] = await db
      .insert(riderLocations)
      .values({
        riderId: createRiderLocationDto.riderId,
        latitude: createRiderLocationDto.latitude,
        longitude: createRiderLocationDto.longitude,
      })
      .returning();

    return location;
  }

  async findAll(query: RiderLocationQueryDto): Promise<RiderLocation[]> {
    const limit = query.limit || 50;

    if (query.riderId) {
      return db
        .select()
        .from(riderLocations)
        .where(eq(riderLocations.riderId, query.riderId))
        .orderBy(desc(riderLocations.recordedAt))
        .limit(limit);
    }

    return db
      .select()
      .from(riderLocations)
      .orderBy(desc(riderLocations.recordedAt))
      .limit(limit);
  }

  async findByRiderId(
    riderId: string,
    limit: number = 50
  ): Promise<RiderLocation[]> {
    return db
      .select()
      .from(riderLocations)
      .where(eq(riderLocations.riderId, riderId))
      .orderBy(desc(riderLocations.recordedAt))
      .limit(limit);
  }

  async findLatestByRiderId(riderId: string): Promise<RiderLocation | null> {
    const [location] = await db
      .select()
      .from(riderLocations)
      .where(eq(riderLocations.riderId, riderId))
      .orderBy(desc(riderLocations.recordedAt))
      .limit(1);

    return location || null;
  }
}

