import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VehicleResponseDto {
  @ApiProperty({ description: 'Vehicle ID' })
  id!: string;

  @ApiProperty({ description: 'Rider ID' })
  riderId!: string;

  @ApiProperty({ description: 'Vehicle type ID' })
  vehicleTypeId!: string;

  @ApiProperty({ description: 'Plate number' })
  plateNumber!: string;

  @ApiPropertyOptional({ description: 'Vehicle color' })
  color?: string | null;

  @ApiPropertyOptional({ description: 'Insurance expiry date' })
  insuranceExpiry?: string | null;

  @ApiPropertyOptional({ description: 'Registration number' })
  registrationNumber?: string | null;

  @ApiProperty({ description: 'Created at timestamp' })
  createdAt!: Date;

  @ApiProperty({ description: 'Updated at timestamp' })
  updatedAt!: Date;
}

