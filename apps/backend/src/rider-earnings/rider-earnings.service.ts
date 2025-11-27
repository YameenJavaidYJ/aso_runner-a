import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '@alain/database';
import {
  riderEarnings,
  type RiderEarning,
  type NewRiderEarning,
} from '@alain/database';
import { eq, and, desc, sql } from 'drizzle-orm';
import { CreateRiderEarningDto } from './dto/create-rider-earning.dto';
import { UpdateRiderEarningDto } from './dto/update-rider-earning.dto';

@Injectable()
export class RiderEarningsService {
  async create(
    createRiderEarningDto: CreateRiderEarningDto
  ): Promise<RiderEarning> {
    // Calculate total earnings
    const baseFee = parseFloat(createRiderEarningDto.baseFee);
    const distanceFee = parseFloat(createRiderEarningDto.distanceFee || '0');
    const surgeMultiplier = parseFloat(
      createRiderEarningDto.surgeMultiplier || '1'
    );
    const bonus = parseFloat(createRiderEarningDto.bonus || '0');
    const tip = parseFloat(createRiderEarningDto.tip || '0');

    const totalEarnings = (
      (baseFee + distanceFee) * surgeMultiplier +
      bonus +
      tip
    ).toFixed(2);

    const [earning] = await db
      .insert(riderEarnings)
      .values({
        riderId: createRiderEarningDto.riderId,
        deliveryAssignmentId: createRiderEarningDto.deliveryAssignmentId,
        baseFee: createRiderEarningDto.baseFee,
        distanceFee: createRiderEarningDto.distanceFee || '0.00',
        surgeMultiplier: createRiderEarningDto.surgeMultiplier || '1.00',
        bonus: createRiderEarningDto.bonus || '0.00',
        tip: createRiderEarningDto.tip || '0.00',
        totalEarnings: totalEarnings,
        payoutStatus: createRiderEarningDto.payoutStatus || 'pending',
      })
      .returning();

    return earning;
  }

  async findAll(riderId?: string): Promise<RiderEarning[]> {
    if (riderId) {
      return db
        .select()
        .from(riderEarnings)
        .where(eq(riderEarnings.riderId, riderId))
        .orderBy(desc(riderEarnings.earnedAt));
    }

    return db
      .select()
      .from(riderEarnings)
      .orderBy(desc(riderEarnings.earnedAt));
  }

  async findOne(id: string): Promise<RiderEarning> {
    const [earning] = await db
      .select()
      .from(riderEarnings)
      .where(eq(riderEarnings.id, id));

    if (!earning) {
      throw new NotFoundException(`Rider earning with ID ${id} not found`);
    }

    return earning;
  }

  async update(
    id: string,
    updateRiderEarningDto: UpdateRiderEarningDto
  ): Promise<RiderEarning> {
    const [earning] = await db
      .select()
      .from(riderEarnings)
      .where(eq(riderEarnings.id, id));

    if (!earning) {
      throw new NotFoundException(`Rider earning with ID ${id} not found`);
    }

    const updateData: Partial<NewRiderEarning> = {};

    if (updateRiderEarningDto.payoutStatus !== undefined) {
      updateData.payoutStatus = updateRiderEarningDto.payoutStatus;
    }
    if (updateRiderEarningDto.payoutId !== undefined) {
      updateData.payoutId = updateRiderEarningDto.payoutId || null;
    }

    // Recalculate total if any fee fields are updated
    if (
      updateRiderEarningDto.baseFee !== undefined ||
      updateRiderEarningDto.distanceFee !== undefined ||
      updateRiderEarningDto.surgeMultiplier !== undefined ||
      updateRiderEarningDto.bonus !== undefined ||
      updateRiderEarningDto.tip !== undefined
    ) {
      const baseFee = parseFloat(
        updateRiderEarningDto.baseFee || earning.baseFee
      );
      const distanceFee = parseFloat(
        updateRiderEarningDto.distanceFee || earning.distanceFee
      );
      const surgeMultiplier = parseFloat(
        updateRiderEarningDto.surgeMultiplier || earning.surgeMultiplier
      );
      const bonus = parseFloat(
        updateRiderEarningDto.bonus || earning.bonus
      );
      const tip = parseFloat(updateRiderEarningDto.tip || earning.tip);

      updateData.totalEarnings = (
        (baseFee + distanceFee) * surgeMultiplier +
        bonus +
        tip
      ).toFixed(2);
    }

    if (updateRiderEarningDto.baseFee !== undefined) {
      updateData.baseFee = updateRiderEarningDto.baseFee;
    }
    if (updateRiderEarningDto.distanceFee !== undefined) {
      updateData.distanceFee = updateRiderEarningDto.distanceFee;
    }
    if (updateRiderEarningDto.surgeMultiplier !== undefined) {
      updateData.surgeMultiplier = updateRiderEarningDto.surgeMultiplier;
    }
    if (updateRiderEarningDto.bonus !== undefined) {
      updateData.bonus = updateRiderEarningDto.bonus;
    }
    if (updateRiderEarningDto.tip !== undefined) {
      updateData.tip = updateRiderEarningDto.tip;
    }

    const [updatedEarning] = await db
      .update(riderEarnings)
      .set(updateData)
      .where(eq(riderEarnings.id, id))
      .returning();

    return updatedEarning;
  }

  async findByRiderId(riderId: string): Promise<RiderEarning[]> {
    return db
      .select()
      .from(riderEarnings)
      .where(eq(riderEarnings.riderId, riderId))
      .orderBy(desc(riderEarnings.earnedAt));
  }

  async getTotalEarningsByRiderId(riderId: string): Promise<{
    total: string;
    pending: string;
    available: string;
    paid: string;
  }> {
    const results = await db
      .select({
        payoutStatus: riderEarnings.payoutStatus,
        total: sql<string>`sum(${riderEarnings.totalEarnings})`,
      })
      .from(riderEarnings)
      .where(eq(riderEarnings.riderId, riderId))
      .groupBy(riderEarnings.payoutStatus);

    const totals = {
      total: '0.00',
      pending: '0.00',
      available: '0.00',
      paid: '0.00',
    };

    results.forEach((result) => {
      const amount = result.total || '0.00';
      totals.total = (
        parseFloat(totals.total) + parseFloat(amount)
      ).toFixed(2);
      totals[result.payoutStatus as keyof typeof totals] = amount;
    });

    return totals;
  }
}

