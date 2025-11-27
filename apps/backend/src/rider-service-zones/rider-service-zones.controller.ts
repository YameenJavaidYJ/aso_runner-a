import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
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
import { RiderServiceZonesService } from './rider-service-zones.service';
import { CreateRiderServiceZoneDto } from './dto/create-rider-service-zone.dto';
import { RiderServiceZoneResponseDto } from './dto/rider-service-zone-response.dto';

@ApiTags('rider-service-zones')
@Controller('rider-service-zones')
export class RiderServiceZonesController {
  constructor(
    private readonly riderServiceZonesService: RiderServiceZonesService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new rider service zone' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Rider service zone created successfully',
    type: RiderServiceZoneResponseDto,
  })
  async create(
    @Body() createRiderServiceZoneDto: CreateRiderServiceZoneDto
  ): Promise<RiderServiceZoneResponseDto> {
    return this.riderServiceZonesService.create(createRiderServiceZoneDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rider service zones' })
  @ApiQuery({
    name: 'riderId',
    required: false,
    description: 'Filter by rider ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of rider service zones retrieved successfully',
  })
  async findAll(@Query('riderId') riderId?: string) {
    return this.riderServiceZonesService.findAll(riderId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a rider service zone by ID' })
  @ApiParam({ name: 'id', description: 'Rider service zone ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Rider service zone retrieved successfully',
    type: RiderServiceZoneResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<RiderServiceZoneResponseDto> {
    return this.riderServiceZonesService.findOne(id);
  }

  @Patch(':id/preferred')
  @ApiOperation({ summary: 'Update preferred status of a service zone' })
  @ApiParam({ name: 'id', description: 'Rider service zone ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Preferred status updated successfully',
    type: RiderServiceZoneResponseDto,
  })
  async updatePreferred(
    @Param('id') id: string,
    @Body('isPreferred') isPreferred: boolean
  ): Promise<RiderServiceZoneResponseDto> {
    return this.riderServiceZonesService.updatePreferred(id, isPreferred);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a rider service zone' })
  @ApiParam({ name: 'id', description: 'Rider service zone ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Rider service zone deleted successfully',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.riderServiceZonesService.remove(id);
  }
}

