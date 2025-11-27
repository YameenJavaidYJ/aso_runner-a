import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty({ description: 'Rider ID' })
  @IsUUID()
  riderId!: string;

  @ApiProperty({ description: 'Vehicle type ID' })
  @IsUUID()
  vehicleTypeId!: string;

  @ApiProperty({ description: 'Plate number' })
  @IsString()
  plateNumber!: string;

  @ApiPropertyOptional({ description: 'Vehicle color' })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional({ description: 'Insurance expiry date (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  insuranceExpiry?: string;

  @ApiPropertyOptional({ description: 'Registration number' })
  @IsOptional()
  @IsString()
  registrationNumber?: string;
}

