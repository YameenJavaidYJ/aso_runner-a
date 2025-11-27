import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsBoolean, IsDecimal, IsOptional } from 'class-validator';

export class CreateRiderAvailabilityDto {
  @ApiProperty({ description: 'Rider ID' })
  @IsUUID()
  riderId!: string;

  @ApiProperty({ description: 'Availability status' })
  @IsBoolean()
  isAvailable!: boolean;

  @ApiPropertyOptional({
    description: 'Current latitude',
    type: String,
  })
  @IsOptional()
  @IsDecimal()
  latitude?: string;

  @ApiPropertyOptional({
    description: 'Current longitude',
    type: String,
  })
  @IsOptional()
  @IsDecimal()
  longitude?: string;
}

