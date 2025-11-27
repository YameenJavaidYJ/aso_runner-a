import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsDateString,
} from 'class-validator';

export enum UserStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  PENDING_VERIFICATION = 'pending_verification',
  DELETED = 'deleted',
}

export enum Language {
  FR = 'fr',
  EN = 'en',
}

export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'Full name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Phone number' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: 'Phone verified status' })
  @IsOptional()
  @IsBoolean()
  phoneVerified?: boolean;

  @ApiPropertyOptional({
    description: 'User status',
    enum: UserStatus,
  })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @ApiPropertyOptional({
    description: 'Preferred language',
    enum: Language,
  })
  @IsOptional()
  @IsEnum(Language)
  language?: Language;

  @ApiPropertyOptional({ description: 'Currency code', default: 'XAF' })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional({ description: 'Profile picture URL (JSON string)' })
  @IsOptional()
  @IsString()
  profilePicture?: string;
}

