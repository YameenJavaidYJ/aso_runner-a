import { ApiProperty } from '@nestjs/swagger';

export class RiderLocationResponseDto {
  @ApiProperty({ description: 'Location ID' })
  id!: string;

  @ApiProperty({ description: 'Rider ID' })
  riderId!: string;

  @ApiProperty({ description: 'Latitude' })
  latitude!: string;

  @ApiProperty({ description: 'Longitude' })
  longitude!: string;

  @ApiProperty({ description: 'Recorded at timestamp' })
  recordedAt!: Date;
}

