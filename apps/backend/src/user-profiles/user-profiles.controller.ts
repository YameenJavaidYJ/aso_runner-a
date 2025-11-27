import {
  Controller,
  Get,
  Param,
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
import { UserProfilesService } from './user-profiles.service';
import { UserRole as UserRoleEnum } from '../user-roles/dto/add-role.dto';

@ApiTags('user-profiles')
@Controller('users')
@ApiBearerAuth()
export class UserProfilesController {
  constructor(private readonly userProfilesService: UserProfilesService) {}

  @Get('me/profiles')
  @ApiOperation({ summary: 'Get all profiles for current user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All user profiles retrieved successfully',
  })
  async getAllProfiles(@Query('userId') userId: string) {
    return this.userProfilesService.getAllProfiles(userId);
  }

  @Get('me/profiles/:role')
  @ApiOperation({ summary: 'Get specific profile by role' })
  @ApiParam({
    name: 'role',
    description: 'Role name',
    enum: UserRoleEnum,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Profile retrieved successfully',
  })
  async getProfileByRole(
    @Query('userId') userId: string,
    @Param('role') role: UserRoleEnum
  ) {
    return this.userProfilesService.getProfileByRole(userId, role);
  }
}

