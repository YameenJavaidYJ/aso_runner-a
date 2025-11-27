import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RiderEarningResponseDto {
  @ApiProperty({ description: 'Earning ID' })
  id!: string;

  @ApiProperty({ description: 'Rider ID' })
  riderId!: string;

  @ApiProperty({ description: 'Delivery assignment ID' })
  deliveryAssignmentId!: string;

  @ApiProperty({ description: 'Base fee' })
  baseFee!: string;

  @ApiProperty({ description: 'Distance fee' })
  distanceFee!: string;

  @ApiProperty({ description: 'Surge multiplier' })
  surgeMultiplier!: string;

  @ApiProperty({ description: 'Bonus amount' })
  bonus!: string;

  @ApiProperty({ description: 'Tip amount' })
  tip!: string;

  @ApiProperty({ description: 'Total earnings' })
  totalEarnings!: string;

  @ApiProperty({ description: 'Payout status' })
  payoutStatus!: string;

  @ApiPropertyOptional({ description: 'Payout ID' })
  payoutId?: string | null;

  @ApiProperty({ description: 'Earned at timestamp' })
  earnedAt!: Date;

  @ApiProperty({ description: 'Created at timestamp' })
  createdAt!: Date;
}

