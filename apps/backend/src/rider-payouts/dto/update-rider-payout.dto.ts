import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import {
  CreateRiderPayoutDto,
  PayoutTransactionStatus,
} from './create-rider-payout.dto';

export class UpdateRiderPayoutDto extends PartialType(CreateRiderPayoutDto) {
  @ApiPropertyOptional({
    description: 'Payout status',
    enum: PayoutTransactionStatus,
  })
  @IsOptional()
  @IsEnum(PayoutTransactionStatus)
  status?: PayoutTransactionStatus;

  @ApiPropertyOptional({ description: 'Payout reference' })
  @IsOptional()
  @IsString()
  payoutReference?: string;

  @ApiPropertyOptional({ description: 'Provider response (JSON string)' })
  @IsOptional()
  @IsString()
  providerResponse?: string;

  @ApiPropertyOptional({ description: 'Failure reason' })
  @IsOptional()
  @IsString()
  failureReason?: string;
}

