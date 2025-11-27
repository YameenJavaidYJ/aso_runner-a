import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RiderResponseDto {
  @ApiProperty({ description: 'Rider ID' })
  id!: string;

  @ApiProperty({ description: 'User ID' })
  userId!: string;

  @ApiProperty({ description: 'Full name' })
  fullName!: string;

  @ApiPropertyOptional({ description: 'Date of birth' })
  dateOfBirth?: string | null;

  @ApiPropertyOptional({ description: 'Emergency contact name' })
  emergencyContactName?: string | null;

  @ApiPropertyOptional({ description: 'Emergency contact phone' })
  emergencyContactPhone?: string | null;

  @ApiProperty({ description: 'Verification status' })
  verificationStatus!: string;

  @ApiPropertyOptional({ description: 'Rating' })
  rating?: string | null;

  @ApiPropertyOptional({ description: 'Total ratings' })
  totalRatings?: number | null;

  @ApiPropertyOptional({ description: 'Total deliveries' })
  totalDeliveries?: number | null;

  @ApiPropertyOptional({ description: 'Acceptance rate' })
  acceptanceRate?: string | null;

  @ApiPropertyOptional({ description: 'On-time rate' })
  onTimeRate?: string | null;

  @ApiPropertyOptional({ description: 'Cancellation rate' })
  cancellationRate?: string | null;

  @ApiProperty({ description: 'Online status' })
  isOnline!: boolean;

  @ApiPropertyOptional({ description: 'Last online timestamp' })
  lastOnlineAt?: Date | null;

  @ApiPropertyOptional({ description: 'Current latitude' })
  currentLatitude?: string | null;

  @ApiPropertyOptional({ description: 'Current longitude' })
  currentLongitude?: string | null;

  @ApiPropertyOptional({ description: 'Verified at timestamp' })
  verifiedAt?: Date | null;

  @ApiPropertyOptional({ description: 'Verified by user ID' })
  verifiedBy?: string | null;

  @ApiProperty({ description: 'Created at timestamp' })
  createdAt!: Date;

  @ApiProperty({ description: 'Updated at timestamp' })
  updatedAt!: Date;
}

