import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RiderPayoutResponseDto {
  @ApiProperty({ description: 'Payout ID' })
  id!: string;

  @ApiProperty({ description: 'Rider ID' })
  riderId!: string;

  @ApiProperty({ description: 'Payout method ID' })
  payoutMethodId!: string;

  @ApiPropertyOptional({ description: 'Payout schedule ID' })
  scheduleId?: string | null;

  @ApiProperty({ description: 'Payout amount' })
  amount!: string;

  @ApiProperty({ description: 'Payout fees' })
  fees!: string;

  @ApiProperty({ description: 'Net amount' })
  netAmount!: string;

  @ApiProperty({ description: 'Payout status' })
  status!: string;

  @ApiPropertyOptional({ description: 'Payout reference' })
  payoutReference?: string | null;

  @ApiPropertyOptional({ description: 'Provider response' })
  providerResponse?: string | null;

  @ApiPropertyOptional({ description: 'Failure reason' })
  failureReason?: string | null;

  @ApiProperty({ description: 'Requested at timestamp' })
  requestedAt!: Date;

  @ApiPropertyOptional({ description: 'Processed at timestamp' })
  processedAt?: Date | null;

  @ApiProperty({ description: 'Created at timestamp' })
  createdAt!: Date;

  @ApiProperty({ description: 'Updated at timestamp' })
  updatedAt!: Date;
}

