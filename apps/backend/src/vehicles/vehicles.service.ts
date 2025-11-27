import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '@alain/database';
import { vehicles, type Vehicle, type NewVehicle } from '@alain/database';
import { eq, desc } from 'drizzle-orm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehiclesService {
  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const [vehicle] = await db
      .insert(vehicles)
      .values({
        riderId: createVehicleDto.riderId,
        vehicleTypeId: createVehicleDto.vehicleTypeId,
        plateNumber: createVehicleDto.plateNumber,
        color: createVehicleDto.color || null,
        insuranceExpiry: createVehicleDto.insuranceExpiry || null,
        registrationNumber: createVehicleDto.registrationNumber || null,
      })
      .returning();

    return vehicle;
  }

  async findAll(riderId?: string): Promise<Vehicle[]> {
    if (riderId) {
      return db
        .select()
        .from(vehicles)
        .where(eq(vehicles.riderId, riderId))
        .orderBy(desc(vehicles.createdAt));
    }

    return db
      .select()
      .from(vehicles)
      .orderBy(desc(vehicles.createdAt));
  }

  async findOne(id: string): Promise<Vehicle> {
    const [vehicle] = await db
      .select()
      .from(vehicles)
      .where(eq(vehicles.id, id));

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    return vehicle;
  }

  async update(
    id: string,
    updateVehicleDto: UpdateVehicleDto
  ): Promise<Vehicle> {
    const [vehicle] = await db
      .select()
      .from(vehicles)
      .where(eq(vehicles.id, id));

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    const updateData: Partial<NewVehicle> = {
      updatedAt: new Date(),
    };

    if (updateVehicleDto.vehicleTypeId !== undefined) {
      updateData.vehicleTypeId = updateVehicleDto.vehicleTypeId;
    }
    if (updateVehicleDto.plateNumber !== undefined) {
      updateData.plateNumber = updateVehicleDto.plateNumber;
    }
    if (updateVehicleDto.color !== undefined) {
      updateData.color = updateVehicleDto.color || null;
    }
    if (updateVehicleDto.insuranceExpiry !== undefined) {
      updateData.insuranceExpiry = updateVehicleDto.insuranceExpiry || null;
    }
    if (updateVehicleDto.registrationNumber !== undefined) {
      updateData.registrationNumber =
        updateVehicleDto.registrationNumber || null;
    }

    const [updatedVehicle] = await db
      .update(vehicles)
      .set(updateData)
      .where(eq(vehicles.id, id))
      .returning();

    return updatedVehicle;
  }

  async remove(id: string): Promise<void> {
    const [vehicle] = await db
      .select()
      .from(vehicles)
      .where(eq(vehicles.id, id));

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    await db.delete(vehicles).where(eq(vehicles.id, id));
  }

  async findByRiderId(riderId: string): Promise<Vehicle[]> {
    return db
      .select()
      .from(vehicles)
      .where(eq(vehicles.riderId, riderId))
      .orderBy(desc(vehicles.createdAt));
  }
}

