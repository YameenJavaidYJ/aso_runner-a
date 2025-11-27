import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsString, IsOptional, IsEnum } from 'class-validator';

export enum VerificationAction {
  SUBMITTED = 'submitted',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  REQUESTED_INFO = 'requested_info',
}

export class CreateVerificationHistoryDto {
  @ApiProperty({ description: 'Rider ID' })
  @IsUUID()
  riderId!: string;

  @ApiProperty({
    description: 'Verification action',
    enum: VerificationAction,
  })
  @IsEnum(VerificationAction)
  action!: VerificationAction;

  @ApiPropertyOptional({ description: 'Notes about the verification' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ description: 'Reviewed by user ID' })
  @IsOptional()
  @IsUUID()
  reviewedBy?: string;
}

