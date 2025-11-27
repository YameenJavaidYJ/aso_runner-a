import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserRolesService } from './user-roles.service';
import { AddRoleDto, UserRole as UserRoleEnum } from './dto/add-role.dto';
import { RoleResponseDto } from './dto/role-response.dto';

@ApiTags('user-roles')
@Controller('users')
@ApiBearerAuth()
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @Post('me/roles')
  @ApiOperation({ summary: 'Request/add a role to current user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Role added successfully',
    type: RoleResponseDto,
  })
  async addRoleToMe(
    @Query('userId') userId: string,
    @Body() addRoleDto: AddRoleDto
  ): Promise<RoleResponseDto> {
    return this.userRolesService.addRole(userId, addRoleDto.role);
  }

  @Delete('me/roles/:role')
  @ApiOperation({ summary: 'Remove a role from current user' })
  @ApiParam({ name: 'role', description: 'Role to remove', enum: UserRoleEnum })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Role removed successfully',
  })
  async removeRoleFromMe(
    @Query('userId') userId: string,
    @Param('role') role: UserRoleEnum
  ): Promise<void> {
    return this.userRolesService.removeRole(userId, role);
  }

  @Get('me/roles')
  @ApiOperation({ summary: 'Get all roles for current user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User roles retrieved successfully',
    type: [RoleResponseDto],
  })
  async getMyRoles(@Query('userId') userId: string): Promise<RoleResponseDto[]> {
    return this.userRolesService.getUserRoles(userId);
  }

  @Post(':id/roles')
  @ApiOperation({ summary: 'Assign role to user (admin only)' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Role assigned successfully',
    type: RoleResponseDto,
  })
  async assignRoleToUser(
    @Param('id') id: string,
    @Body() addRoleDto: AddRoleDto,
    @Query('assignedBy') assignedBy?: string
  ): Promise<RoleResponseDto> {
    return this.userRolesService.addRole(
      addRoleDto.userId || id,
      addRoleDto.role,
      assignedBy
    );
  }

  @Delete(':id/roles/:role')
  @ApiOperation({ summary: 'Remove role from user (admin only)' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiParam({ name: 'role', description: 'Role to remove', enum: UserRoleEnum })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Role removed successfully',
  })
  async removeRoleFromUser(
    @Param('id') id: string,
    @Param('role') role: UserRoleEnum
  ): Promise<void> {
    return this.userRolesService.removeRole(id, role);
  }
}

