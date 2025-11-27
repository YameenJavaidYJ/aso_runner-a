import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VerificationHistoryResponseDto {
  @ApiProperty({ description: 'Verification history ID' })
  id!: string;

  @ApiProperty({ description: 'Rider ID' })
  riderId!: string;

  @ApiProperty({ description: 'Verification action' })
  action!: string;

  @ApiPropertyOptional({ description: 'Notes' })
  notes?: string | null;

  @ApiPropertyOptional({ description: 'Reviewed by user ID' })
  reviewedBy?: string | null;

  @ApiProperty({ description: 'Created at timestamp' })
  createdAt!: Date;
}

