import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsDateString,
  IsOptional,
  IsBoolean,
  IsDecimal,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRiderDto {
  @ApiProperty({ description: 'User ID associated with the rider' })
  @IsUUID()
  userId!: string;

  @ApiProperty({ description: 'Full name of the rider' })
  @IsString()
  fullName!: string;

  @ApiPropertyOptional({ description: 'Date of birth (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional({ description: 'Emergency contact name' })
  @IsOptional()
  @IsString()
  emergencyContactName?: string;

  @ApiPropertyOptional({ description: 'Emergency contact phone number' })
  @IsOptional()
  @IsString()
  emergencyContactPhone?: string;

  @ApiPropertyOptional({
    description: 'Initial latitude for rider location',
    type: String,
  })
  @IsOptional()
  @IsDecimal()
  currentLatitude?: string;

  @ApiPropertyOptional({
    description: 'Initial longitude for rider location',
    type: String,
  })
  @IsOptional()
  @IsDecimal()
  currentLongitude?: string;
}

