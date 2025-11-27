import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RiderServiceZoneResponseDto {
  @ApiProperty({ description: 'Service zone ID' })
  id!: string;

  @ApiProperty({ description: 'Rider ID' })
  riderId!: string;

  @ApiProperty({ description: 'Delivery zone ID' })
  deliveryZoneId!: string;

  @ApiProperty({ description: 'Is preferred zone' })
  isPreferred!: boolean;

  @ApiProperty({ description: 'Created at timestamp' })
  createdAt!: Date;
}

