import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsDecimal } from 'class-validator';

export class CreateRiderLocationDto {
  @ApiProperty({ description: 'Rider ID' })
  @IsUUID()
  riderId!: string;

  @ApiProperty({
    description: 'Latitude',
    type: String,
  })
  @IsDecimal()
  latitude!: string;

  @ApiProperty({
    description: 'Longitude',
    type: String,
  })
  @IsDecimal()
  longitude!: string;
}

