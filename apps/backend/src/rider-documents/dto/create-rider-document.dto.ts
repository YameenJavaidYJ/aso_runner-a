import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsString, IsDateString, IsOptional, IsEnum } from 'class-validator';

export enum DocumentStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export class CreateRiderDocumentDto {
  @ApiProperty({ description: 'Rider ID' })
  @IsUUID()
  riderId!: string;

  @ApiProperty({ description: 'Document type ID' })
  @IsUUID()
  documentTypeId!: string;

  @ApiProperty({ description: 'Document URL' })
  @IsString()
  documentUrl!: string;

  @ApiPropertyOptional({
    description: 'Document status',
    enum: DocumentStatus,
    default: DocumentStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(DocumentStatus)
  status?: DocumentStatus;

  @ApiPropertyOptional({ description: 'Expiry date (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  expiryDate?: string;
}

