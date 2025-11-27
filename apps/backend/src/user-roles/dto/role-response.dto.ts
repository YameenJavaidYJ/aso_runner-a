import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RoleResponseDto {
  @ApiProperty({ description: 'Role assignment ID' })
  id!: string;

  @ApiProperty({ description: 'User ID' })
  userId!: string;

  @ApiProperty({ description: 'Role name' })
  role!: string;

  @ApiProperty({ description: 'Assigned at timestamp' })
  assignedAt!: Date;

  @ApiPropertyOptional({ description: 'Assigned by user ID' })
  assignedBy?: string | null;
}

