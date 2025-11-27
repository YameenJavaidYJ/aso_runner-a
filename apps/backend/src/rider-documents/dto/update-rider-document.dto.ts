import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsDateString, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateRiderDocumentDto, DocumentStatus } from './create-rider-document.dto';

export class UpdateRiderDocumentDto extends PartialType(CreateRiderDocumentDto) {
  @ApiPropertyOptional({
    description: 'Document status',
    enum: DocumentStatus,
  })
  @IsOptional()
  @IsEnum(DocumentStatus)
  status?: DocumentStatus;

  @ApiPropertyOptional({ description: 'Admin notes' })
  @IsOptional()
  @IsString()
  adminNotes?: string;

  @ApiPropertyOptional({ description: 'Reviewed by user ID' })
  @IsOptional()
  @IsUUID()
  reviewedBy?: string;
}

