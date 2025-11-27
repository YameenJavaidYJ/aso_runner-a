import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserResponseDto } from './user-response.dto';

export class RoleDto {
  @ApiProperty({ description: 'Role ID' })
  id!: string;

  @ApiProperty({ description: 'Role name' })
  role!: string;

  @ApiProperty({ description: 'Assigned at timestamp' })
  assignedAt!: Date;

  @ApiPropertyOptional({ description: 'Assigned by user ID' })
  assignedBy?: string | null;
}

export class UserWithRolesResponseDto extends UserResponseDto {
  @ApiProperty({
    description: 'User roles',
    type: [RoleDto],
  })
  roles!: RoleDto[];

  @ApiPropertyOptional({ description: 'Rider profile (if user has rider role)' })
  riderProfile?: unknown;

  @ApiPropertyOptional({ description: 'Vendor profile (if user has vendor role)' })
  vendorProfile?: unknown;

  @ApiPropertyOptional({ description: 'Customer profile (if user has customer role)' })
  customerProfile?: unknown;

  @ApiPropertyOptional({ description: 'Admin profile (if user has admin role)' })
  adminProfile?: unknown;
}

