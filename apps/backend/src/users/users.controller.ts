import {
  Controller,
  Get,
  Patch,
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
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserWithRolesResponseDto } from './dto/user-with-roles-response.dto';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user with all roles and profiles' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Current user retrieved successfully',
    type: UserWithRolesResponseDto,
  })
  async getMe(@Query('userId') userId: string): Promise<UserWithRolesResponseDto> {
    // In real implementation, get userId from authenticated session
    const userData = await this.usersService.getUserWithRoles(userId);
    return {
      ...userData.user,
      roles: userData.roles,
      riderProfile: userData.profiles.rider,
      vendorProfile: userData.profiles.vendor,
      customerProfile: userData.profiles.customer,
      adminProfile: userData.profiles.admin,
    } as UserWithRolesResponseDto;
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update current user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated successfully',
    type: UserResponseDto,
  })
  async updateMe(
    @Query('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserResponseDto> {
    return this.usersService.update(userId, updateUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID (admin only)' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User retrieved successfully',
    type: UserResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return this.usersService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'List users (admin only)' })
  @ApiQuery({ name: 'status', required: false, description: 'Filter by status' })
  @ApiQuery({ name: 'role', required: false, description: 'Filter by role' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of users retrieved successfully',
  })
  async findAll(@Query() query: {
    status?: string;
    role?: string;
    page?: number;
    limit?: number;
  }) {
    return this.usersService.findAll(query);
  }
}

