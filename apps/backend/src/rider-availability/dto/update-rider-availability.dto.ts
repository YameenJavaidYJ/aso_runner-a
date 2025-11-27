import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDecimal, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateRiderAvailabilityDto } from './create-rider-availability.dto';

export class UpdateRiderAvailabilityDto extends PartialType(
  CreateRiderAvailabilityDto
) {}

