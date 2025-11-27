import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VehicleTypeResponseDto {
  @ApiProperty({ description: 'Vehicle type ID' })
  id!: string;

  @ApiProperty({ description: 'Vehicle type name' })
  name!: string;

  @ApiPropertyOptional({ description: 'Vehicle type description' })
  description?: string | null;
}

