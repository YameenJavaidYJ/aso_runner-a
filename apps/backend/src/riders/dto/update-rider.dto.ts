import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsDateString,
  IsOptional,
  IsBoolean,
  IsDecimal,
  IsInt,
  Min,
  Max,
  IsEnum,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateRiderDto } from './create-rider.dto';

export enum VerificationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  SUSPENDED = 'suspended',
}

export class UpdateRiderDto extends PartialType(CreateRiderDto) {
  @ApiPropertyOptional({
    description: 'Verification status',
    enum: VerificationStatus,
  })
  @IsOptional()
  @IsEnum(VerificationStatus)
  verificationStatus?: VerificationStatus;

  @ApiPropertyOptional({ description: 'Online status' })
  @IsOptional()
  @IsBoolean()
  isOnline?: boolean;

  @ApiPropertyOptional({
    description: 'Rating (0.00 to 5.00)',
    type: String,
  })
  @IsOptional()
  @IsDecimal()
  rating?: string;

  @ApiPropertyOptional({ description: 'Total number of ratings' })
  @IsOptional()
  @IsInt()
  @Min(0)
  totalRatings?: number;

  @ApiPropertyOptional({ description: 'Total number of deliveries' })
  @IsOptional()
  @IsInt()
  @Min(0)
  totalDeliveries?: number;

  @ApiPropertyOptional({
    description: 'Acceptance rate (0.00 to 100.00)',
    type: String,
  })
  @IsOptional()
  @IsDecimal()
  acceptanceRate?: string;

  @ApiPropertyOptional({
    description: 'On-time delivery rate (0.00 to 100.00)',
    type: String,
  })
  @IsOptional()
  @IsDecimal()
  onTimeRate?: string;

  @ApiPropertyOptional({
    description: 'Cancellation rate (0.00 to 100.00)',
    type: String,
  })
  @IsOptional()
  @IsDecimal()
  cancellationRate?: string;
  
}

