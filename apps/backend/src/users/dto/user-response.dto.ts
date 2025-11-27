import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ description: 'User ID' })
  id!: string;

  @ApiProperty({ description: 'Full name' })
  name!: string;

  @ApiProperty({ description: 'Email address' })
  email!: string;

  @ApiProperty({ description: 'Email verified status' })
  emailVerified!: boolean;

  @ApiPropertyOptional({ description: 'Profile image URL' })
  image?: string | null;

  @ApiPropertyOptional({ description: 'Phone number' })
  phone?: string | null;

  @ApiPropertyOptional({ description: 'Phone verified status' })
  phoneVerified?: boolean | null;

  @ApiProperty({ description: 'User status' })
  status!: string;

  @ApiPropertyOptional({ description: 'Preferred language' })
  language?: string | null;

  @ApiPropertyOptional({ description: 'Currency code' })
  currency?: string | null;

  @ApiPropertyOptional({ description: 'Last login timestamp' })
  lastLoginAt?: Date | null;

  @ApiPropertyOptional({ description: 'Profile picture (JSON string)' })
  profilePicture?: string | null;

  @ApiProperty({ description: 'Created at timestamp' })
  createdAt!: Date;

  @ApiProperty({ description: 'Updated at timestamp' })
  updatedAt!: Date;
}

