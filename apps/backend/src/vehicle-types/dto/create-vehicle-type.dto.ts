import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateVehicleTypeDto {
  @ApiProperty({ description: 'Vehicle type name (e.g., bike, car)' })
  @IsString()
  name!: string;

  @ApiPropertyOptional({ description: 'Vehicle type description' })
  @IsOptional()
  @IsString()
  description?: string;
}

