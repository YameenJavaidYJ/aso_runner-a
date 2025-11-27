import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '@alain/database';
import {
  riderPayouts,
  type RiderPayout,
  type NewRiderPayout,
} from '@alain/database';
import { eq, desc } from 'drizzle-orm';
import { CreateRiderPayoutDto } from './dto/create-rider-payout.dto';
import { UpdateRiderPayoutDto } from './dto/update-rider-payout.dto';

@Injectable()
export class RiderPayoutsService {
  async create(createRiderPayoutDto: CreateRiderPayoutDto): Promise<RiderPayout> {
    const amount = parseFloat(createRiderPayoutDto.amount);
    const fees = parseFloat(createRiderPayoutDto.fees || '0');
    const netAmount = (amount - fees).toFixed(2);

    const [payout] = await db
      .insert(riderPayouts)
      .values({
        riderId: createRiderPayoutDto.riderId,
        payoutMethodId: createRiderPayoutDto.payoutMethodId,
        scheduleId: createRiderPayoutDto.scheduleId || null,
        amount: createRiderPayoutDto.amount,
        fees: createRiderPayoutDto.fees || '0.00',
        netAmount: netAmount,
        status: createRiderPayoutDto.status || 'pending',
      })
      .returning();

    return payout;
  }

  async findAll(riderId?: string): Promise<RiderPayout[]> {
    if (riderId) {
      return db
        .select()
        .from(riderPayouts)
        .where(eq(riderPayouts.riderId, riderId))
        .orderBy(desc(riderPayouts.requestedAt));
    }

    return db
      .select()
      .from(riderPayouts)
      .orderBy(desc(riderPayouts.requestedAt));
  }

  async findOne(id: string): Promise<RiderPayout> {
    const [payout] = await db
      .select()
      .from(riderPayouts)
      .where(eq(riderPayouts.id, id));

    if (!payout) {
      throw new NotFoundException(`Rider payout with ID ${id} not found`);
    }

    return payout;
  }

  async update(
    id: string,
    updateRiderPayoutDto: UpdateRiderPayoutDto
  ): Promise<RiderPayout> {
    const [payout] = await db
      .select()
      .from(riderPayouts)
      .where(eq(riderPayouts.id, id));

    if (!payout) {
      throw new NotFoundException(`Rider payout with ID ${id} not found`);
    }

    const updateData: Partial<NewRiderPayout> = {
      updatedAt: new Date(),
    };

    if (updateRiderPayoutDto.status !== undefined) {
      updateData.status = updateRiderPayoutDto.status;
      if (
        updateRiderPayoutDto.status === 'completed' ||
        updateRiderPayoutDto.status === 'failed'
      ) {
        updateData.processedAt = new Date();
      }
    }
    if (updateRiderPayoutDto.payoutReference !== undefined) {
      updateData.payoutReference = updateRiderPayoutDto.payoutReference || null;
    }
    if (updateRiderPayoutDto.providerResponse !== undefined) {
      updateData.providerResponse =
        updateRiderPayoutDto.providerResponse || null;
    }
    if (updateRiderPayoutDto.failureReason !== undefined) {
      updateData.failureReason = updateRiderPayoutDto.failureReason || null;
    }
    if (updateRiderPayoutDto.amount !== undefined) {
      const amount = parseFloat(updateRiderPayoutDto.amount);
      const fees = parseFloat(
        updateRiderPayoutDto.fees || payout.fees || '0'
      );
      updateData.amount = updateRiderPayoutDto.amount;
      updateData.fees = updateRiderPayoutDto.fees || payout.fees;
      updateData.netAmount = (amount - fees).toFixed(2);
    } else if (updateRiderPayoutDto.fees !== undefined) {
      const amount = parseFloat(payout.amount);
      const fees = parseFloat(updateRiderPayoutDto.fees);
      updateData.fees = updateRiderPayoutDto.fees;
      updateData.netAmount = (amount - fees).toFixed(2);
    }

    const [updatedPayout] = await db
      .update(riderPayouts)
      .set(updateData)
      .where(eq(riderPayouts.id, id))
      .returning();

    return updatedPayout;
  }

  async findByRiderId(riderId: string): Promise<RiderPayout[]> {
    return db
      .select()
      .from(riderPayouts)
      .where(eq(riderPayouts.riderId, riderId))
      .orderBy(desc(riderPayouts.requestedAt));
  }

  async findByStatus(status: string): Promise<RiderPayout[]> {
    return db
      .select()
      .from(riderPayouts)
      .where(eq(riderPayouts.status, status))
      .orderBy(desc(riderPayouts.requestedAt));
  }
}

