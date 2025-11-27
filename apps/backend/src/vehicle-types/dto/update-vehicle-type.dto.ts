import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateVehicleTypeDto } from './create-vehicle-type.dto';

export class UpdateVehicleTypeDto extends PartialType(CreateVehicleTypeDto) {}

