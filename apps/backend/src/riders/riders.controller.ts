import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { RidersService } from './riders.service';
import { CreateRiderDto } from './dto/create-rider.dto';
import { UpdateRiderDto } from './dto/update-rider.dto';
import { RiderQueryDto } from './dto/rider-query.dto';
import { RiderResponseDto } from './dto/rider-response.dto';

@ApiTags('riders')
@Controller('riders')
export class RidersController {
  constructor(private readonly ridersService: RidersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new rider' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Rider created successfully',
    type: RiderResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  async create(@Body() createRiderDto: CreateRiderDto): Promise<RiderResponseDto> {
    return this.ridersService.create(createRiderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all riders with pagination and filters' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of riders retrieved successfully',
  })
  async findAll(@Query() query: RiderQueryDto) {
    return this.ridersService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a rider by ID' })
  @ApiParam({ name: 'id', description: 'Rider ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Rider retrieved successfully',
    type: RiderResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Rider not found',
  })
  async findOne(@Param('id') id: string): Promise<RiderResponseDto> {
    return this.ridersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a rider' })
  @ApiParam({ name: 'id', description: 'Rider ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Rider updated successfully',
    type: RiderResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Rider not found',
  })
  async update(
    @Param('id') id: string,
    @Body() updateRiderDto: UpdateRiderDto
  ): Promise<RiderResponseDto> {
    return this.ridersService.update(id, updateRiderDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a rider' })
  @ApiParam({ name: 'id', description: 'Rider ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Rider deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Rider not found',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.ridersService.remove(id);
  }
}

