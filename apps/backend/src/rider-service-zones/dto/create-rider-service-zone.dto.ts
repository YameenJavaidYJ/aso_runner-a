import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsBoolean, IsOptional } from 'class-validator';

export class CreateRiderServiceZoneDto {
  @ApiProperty({ description: 'Rider ID' })
  @IsUUID()
  riderId!: string;

  @ApiProperty({ description: 'Delivery zone ID' })
  @IsUUID()
  deliveryZoneId!: string;

  @ApiPropertyOptional({
    description: 'Whether this is a preferred zone',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isPreferred?: boolean;
}

