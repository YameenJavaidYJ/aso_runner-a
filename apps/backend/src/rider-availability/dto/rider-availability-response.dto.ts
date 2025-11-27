import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RiderAvailabilityResponseDto {
  @ApiProperty({ description: 'Availability ID' })
  id!: string;

  @ApiProperty({ description: 'Rider ID' })
  riderId!: string;

  @ApiProperty({ description: 'Availability status' })
  isAvailable!: boolean;

  @ApiPropertyOptional({ description: 'Current latitude' })
  latitude?: string | null;

  @ApiPropertyOptional({ description: 'Current longitude' })
  longitude?: string | null;

  @ApiProperty({ description: 'Last updated timestamp' })
  lastUpdatedAt!: Date;
}

