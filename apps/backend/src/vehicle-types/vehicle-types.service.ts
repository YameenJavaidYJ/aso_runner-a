import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '@alain/database';
import {
  vehicleTypes,
  type VehicleType,
  type NewVehicleType,
} from '@alain/database';
import { eq } from 'drizzle-orm';
import { CreateVehicleTypeDto } from './dto/create-vehicle-type.dto';
import { UpdateVehicleTypeDto } from './dto/update-vehicle-type.dto';

@Injectable()
export class VehicleTypesService {
  async create(createVehicleTypeDto: CreateVehicleTypeDto): Promise<VehicleType> {
    const [vehicleType] = await db
      .insert(vehicleTypes)
      .values({
        name: createVehicleTypeDto.name,
        description: createVehicleTypeDto.description || null,
      })
      .returning();

    return vehicleType;
  }

  async findAll(): Promise<VehicleType[]> {
    return db.select().from(vehicleTypes);
  }

  async findOne(id: string): Promise<VehicleType> {
    const [vehicleType] = await db
      .select()
      .from(vehicleTypes)
      .where(eq(vehicleTypes.id, id));

    if (!vehicleType) {
      throw new NotFoundException(`Vehicle type with ID ${id} not found`);
    }

    return vehicleType;
  }

  async update(
    id: string,
    updateVehicleTypeDto: UpdateVehicleTypeDto
  ): Promise<VehicleType> {
    const [vehicleType] = await db
      .select()
      .from(vehicleTypes)
      .where(eq(vehicleTypes.id, id));

    if (!vehicleType) {
      throw new NotFoundException(`Vehicle type with ID ${id} not found`);
    }

    const updateData: Partial<NewVehicleType> = {};

    if (updateVehicleTypeDto.name !== undefined) {
      updateData.name = updateVehicleTypeDto.name;
    }
    if (updateVehicleTypeDto.description !== undefined) {
      updateData.description = updateVehicleTypeDto.description || null;
    }

    const [updatedVehicleType] = await db
      .update(vehicleTypes)
      .set(updateData)
      .where(eq(vehicleTypes.id, id))
      .returning();

    return updatedVehicleType;
  }

  async remove(id: string): Promise<void> {
    const [vehicleType] = await db
      .select()
      .from(vehicleTypes)
      .where(eq(vehicleTypes.id, id));

    if (!vehicleType) {
      throw new NotFoundException(`Vehicle type with ID ${id} not found`);
    }

    await db.delete(vehicleTypes).where(eq(vehicleTypes.id, id));
  }
}

