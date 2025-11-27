import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { RiderLocationsService } from './rider-locations.service';
import { CreateRiderLocationDto } from './dto/create-rider-location.dto';
import { RiderLocationQueryDto } from './dto/rider-location-query.dto';
import { RiderLocationResponseDto } from './dto/rider-location-response.dto';

@ApiTags('rider-locations')
@Controller('rider-locations')
export class RiderLocationsController {
  constructor(private readonly riderLocationsService: RiderLocationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new rider location record' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Rider location created successfully',
    type: RiderLocationResponseDto,
  })
  async create(
    @Body() createRiderLocationDto: CreateRiderLocationDto
  ): Promise<RiderLocationResponseDto> {
    return this.riderLocationsService.create(createRiderLocationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rider location records' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of rider locations retrieved successfully',
  })
  async findAll(@Query() query: RiderLocationQueryDto) {
    return this.riderLocationsService.findAll(query);
  }

  @Get('rider/:riderId')
  @ApiOperation({ summary: 'Get location history for a specific rider' })
  @ApiParam({ name: 'riderId', description: 'Rider ID' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of records to return',
    type: Number,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Rider location history retrieved successfully',
  })
  async findByRiderId(
    @Param('riderId') riderId: string,
    @Query('limit') limit?: number
  ) {
    return this.riderLocationsService.findByRiderId(
      riderId,
      limit ? Number(limit) : 50
    );
  }

  @Get('rider/:riderId/latest')
  @ApiOperation({ summary: 'Get latest location for a specific rider' })
  @ApiParam({ name: 'riderId', description: 'Rider ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Latest rider location retrieved successfully',
    type: RiderLocationResponseDto,
  })
  async findLatestByRiderId(
    @Param('riderId') riderId: string
  ): Promise<RiderLocationResponseDto | null> {
    return this.riderLocationsService.findLatestByRiderId(riderId);
  }
}

