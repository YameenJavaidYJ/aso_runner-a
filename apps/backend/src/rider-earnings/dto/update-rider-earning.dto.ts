import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDecimal, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateRiderEarningDto, PayoutStatus } from './create-rider-earning.dto';

export class UpdateRiderEarningDto extends PartialType(CreateRiderEarningDto) {
  @ApiPropertyOptional({
    description: 'Payout status',
    enum: PayoutStatus,
  })
  @IsOptional()
  @IsEnum(PayoutStatus)
  payoutStatus?: PayoutStatus;

  @ApiPropertyOptional({ description: 'Payout ID' })
  @IsOptional()
  @IsUUID()
  payoutId?: string;
}

