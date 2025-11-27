import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { UserRole as UserRoleEnum } from '../../user-roles/dto/add-role.dto';

export class SetActiveRoleDto {
  @ApiProperty({
    description: 'Active role to set for current session',
    enum: UserRoleEnum,
  })
  @IsEnum(UserRoleEnum)
  role!: UserRoleEnum;
}
