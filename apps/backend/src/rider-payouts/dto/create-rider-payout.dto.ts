import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsDecimal, IsOptional, IsEnum } from 'class-validator';

export enum PayoutTransactionStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export class CreateRiderPayoutDto {
  @ApiProperty({ description: 'Rider ID' })
  @IsUUID()
  riderId!: string;

  @ApiProperty({ description: 'Payout method ID' })
  @IsUUID()
  payoutMethodId!: string;

  @ApiProperty({
    description: 'Payout amount',
    type: String,
  })
  @IsDecimal()
  amount!: string;

  @ApiPropertyOptional({
    description: 'Payout fees',
    type: String,
    default: '0.00',
  })
  @IsOptional()
  @IsDecimal()
  fees?: string;

  @ApiPropertyOptional({ description: 'Payout schedule ID' })
  @IsOptional()
  @IsUUID()
  scheduleId?: string;

  @ApiPropertyOptional({
    description: 'Payout status',
    enum: PayoutTransactionStatus,
    default: PayoutTransactionStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(PayoutTransactionStatus)
  status?: PayoutTransactionStatus;
}

