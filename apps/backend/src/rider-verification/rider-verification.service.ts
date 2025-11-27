import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '@alain/database';
import {
  riderVerificationHistory,
  type RiderVerificationHistory,
  type NewRiderVerificationHistory,
  riders,
} from '@alain/database';
import { eq, and, desc } from 'drizzle-orm';
import { CreateVerificationHistoryDto } from './dto/create-verification-history.dto';

@Injectable()
export class RiderVerificationService {
  async create(
    createVerificationHistoryDto: CreateVerificationHistoryDto
  ): Promise<RiderVerificationHistory> {
    const [history] = await db
      .insert(riderVerificationHistory)
      .values({
        riderId: createVerificationHistoryDto.riderId,
        action: createVerificationHistoryDto.action,
        notes: createVerificationHistoryDto.notes || null,
        reviewedBy: createVerificationHistoryDto.reviewedBy || null,
      })
      .returning();

    // Update rider verification status if action is approved or rejected
    if (
      createVerificationHistoryDto.action === 'approved' ||
      createVerificationHistoryDto.action === 'rejected'
    ) {
      await db
        .update(riders)
        .set({
          verificationStatus: createVerificationHistoryDto.action,
          verifiedAt: new Date(),
          verifiedBy: createVerificationHistoryDto.reviewedBy || null,
        })
        .where(eq(riders.id, createVerificationHistoryDto.riderId));
    }

    return history;
  }

  async findAll(riderId?: string): Promise<RiderVerificationHistory[]> {
    if (riderId) {
      return db
        .select()
        .from(riderVerificationHistory)
        .where(eq(riderVerificationHistory.riderId, riderId))
        .orderBy(desc(riderVerificationHistory.createdAt));
    }

    return db
      .select()
      .from(riderVerificationHistory)
      .orderBy(desc(riderVerificationHistory.createdAt));
  }

  async findOne(id: string): Promise<RiderVerificationHistory> {
    const [history] = await db
      .select()
      .from(riderVerificationHistory)
      .where(eq(riderVerificationHistory.id, id));

    if (!history) {
      throw new NotFoundException(
        `Verification history with ID ${id} not found`
      );
    }

    return history;
  }

  async findByRiderId(riderId: string): Promise<RiderVerificationHistory[]> {
    return db
      .select()
      .from(riderVerificationHistory)
      .where(eq(riderVerificationHistory.riderId, riderId))
      .orderBy(desc(riderVerificationHistory.createdAt));
  }
}

