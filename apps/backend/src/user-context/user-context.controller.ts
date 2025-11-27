import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserContextService } from './user-context.service';
import { SetActiveRoleDto } from './dto/set-active-role.dto';
import { UserRole as UserRoleEnum } from '../user-roles/dto/add-role.dto';

@ApiTags('user-context')
@Controller('users')
@ApiBearerAuth()
export class UserContextController {
  constructor(private readonly userContextService: UserContextService) {}

  @Post('me/active-role')
  @ApiOperation({ summary: 'Set active role for current session' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Active role set successfully',
  })
  async setActiveRole(
    @Query('userId') userId: string,
    @Body() setActiveRoleDto: SetActiveRoleDto
  ): Promise<{ activeRole: UserRoleEnum }> {
    const role = await this.userContextService.setActiveRole(
      userId,
      setActiveRoleDto.role
    );
    return { activeRole: role };
  }

  @Get('me/active-role')
  @ApiOperation({ summary: 'Get current active role' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Active role retrieved successfully',
  })
  async getActiveRole(@Query('userId') userId: string): Promise<{
    activeRole: UserRoleEnum | null;
    allRoles: UserRoleEnum[];
  }> {
    const activeRole = await this.userContextService.getActiveRole(userId);
    const allRoles = await this.userContextService.getUserRoles(userId);
    return { activeRole, allRoles };
  }

  @Delete('me/active-role')
  @ApiOperation({ summary: 'Clear active role (switch to no active role)' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Active role cleared successfully',
  })
  async clearActiveRole(@Query('userId') userId: string): Promise<void> {
    return this.userContextService.clearActiveRole(userId);
  }
}

