import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
  IsDecimal,
  IsOptional,
  IsEnum,
} from 'class-validator';

export enum PayoutStatus {
  PENDING = 'pending',
  AVAILABLE = 'available',
  ON_HOLD = 'on_hold',
  PAID = 'paid',
}

export class CreateRiderEarningDto {
  @ApiProperty({ description: 'Rider ID' })
  @IsUUID()
  riderId!: string;

  @ApiProperty({ description: 'Delivery assignment ID' })
  @IsUUID()
  deliveryAssignmentId!: string;

  @ApiProperty({
    description: 'Base fee',
    type: String,
  })
  @IsDecimal()
  baseFee!: string;

  @ApiPropertyOptional({
    description: 'Distance fee',
    type: String,
    default: '0.00',
  })
  @IsOptional()
  @IsDecimal()
  distanceFee?: string;

  @ApiPropertyOptional({
    description: 'Surge multiplier',
    type: String,
    default: '1.00',
  })
  @IsOptional()
  @IsDecimal()
  surgeMultiplier?: string;

  @ApiPropertyOptional({
    description: 'Bonus amount',
    type: String,
    default: '0.00',
  })
  @IsOptional()
  @IsDecimal()
  bonus?: string;

  @ApiPropertyOptional({
    description: 'Tip amount',
    type: String,
    default: '0.00',
  })
  @IsOptional()
  @IsDecimal()
  tip?: string;

  @ApiPropertyOptional({
    description: 'Payout status',
    enum: PayoutStatus,
    default: PayoutStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(PayoutStatus)
  payoutStatus?: PayoutStatus;
}

