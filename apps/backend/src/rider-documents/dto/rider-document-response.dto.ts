import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RiderDocumentResponseDto {
  @ApiProperty({ description: 'Document ID' })
  id!: string;

  @ApiProperty({ description: 'Rider ID' })
  riderId!: string;

  @ApiProperty({ description: 'Document type ID' })
  documentTypeId!: string;

  @ApiProperty({ description: 'Document URL' })
  documentUrl!: string;

  @ApiProperty({ description: 'Document status' })
  status!: string;

  @ApiPropertyOptional({ description: 'Expiry date' })
  expiryDate?: string | null;

  @ApiPropertyOptional({ description: 'Admin notes' })
  adminNotes?: string | null;

  @ApiProperty({ description: 'Uploaded at timestamp' })
  uploadedAt!: Date;

  @ApiPropertyOptional({ description: 'Reviewed at timestamp' })
  reviewedAt?: Date | null;

  @ApiPropertyOptional({ description: 'Reviewed by user ID' })
  reviewedBy?: string | null;
}

