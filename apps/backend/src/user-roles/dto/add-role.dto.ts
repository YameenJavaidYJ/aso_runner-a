import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

export enum UserRole {
  CUSTOMER = 'customer',
  RIDER = 'rider',
  VENDOR = 'vendor',
  ADMIN = 'admin',
  SUPPORT_ADMIN = 'support_admin',
  FINANCE_ADMIN = 'finance_admin',
}

export class AddRoleDto {
  @ApiProperty({
    description: 'Role to assign',
    enum: UserRole,
  })
  @IsEnum(UserRole)
  role!: UserRole;

  @ApiPropertyOptional({
    description: 'User ID (admin only - for assigning to other users)',
  })
  @IsOptional()
  @IsUUID()
  userId?: string;
}

