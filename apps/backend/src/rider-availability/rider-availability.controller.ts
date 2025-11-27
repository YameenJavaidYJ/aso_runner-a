import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { RiderAvailabilityService } from './rider-availability.service';
import { CreateRiderAvailabilityDto } from './dto/create-rider-availability.dto';
import { UpdateRiderAvailabilityDto } from './dto/update-rider-availability.dto';
import { RiderAvailabilityResponseDto } from './dto/rider-availability-response.dto';

@ApiTags('rider-availability')
@Controller('rider-availability')
export class RiderAvailabilityController {
  constructor(
    private readonly riderAvailabilityService: RiderAvailabilityService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create or update rider availability' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Rider availability created/updated successfully',
    type: RiderAvailabilityResponseDto,
  })
  async create(
    @Body() createRiderAvailabilityDto: CreateRiderAvailabilityDto
  ): Promise<RiderAvailabilityResponseDto> {
    return this.riderAvailabilityService.create(createRiderAvailabilityDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rider availability records' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of rider availability retrieved successfully',
  })
  async findAll(): Promise<RiderAvailabilityResponseDto[]> {
    return this.riderAvailabilityService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get rider availability by ID' })
  @ApiParam({ name: 'id', description: 'Rider availability ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Rider availability retrieved successfully',
    type: RiderAvailabilityResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<RiderAvailabilityResponseDto> {
    return this.riderAvailabilityService.findOne(id);
  }

  @Get('rider/:riderId')
  @ApiOperation({ summary: 'Get rider availability by rider ID' })
  @ApiParam({ name: 'riderId', description: 'Rider ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Rider availability retrieved successfully',
    type: RiderAvailabilityResponseDto,
  })
  async findByRiderId(
    @Param('riderId') riderId: string
  ): Promise<RiderAvailabilityResponseDto | null> {
    return this.riderAvailabilityService.findByRiderId(riderId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update rider availability' })
  @ApiParam({ name: 'id', description: 'Rider availability ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Rider availability updated successfully',
    type: RiderAvailabilityResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateRiderAvailabilityDto: UpdateRiderAvailabilityDto
  ): Promise<RiderAvailabilityResponseDto> {
    return this.riderAvailabilityService.update(id, updateRiderAvailabilityDto);
  }

  @Patch('rider/:riderId')
  @ApiOperation({ summary: 'Update rider availability by rider ID' })
  @ApiParam({ name: 'riderId', description: 'Rider ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Rider availability updated successfully',
    type: RiderAvailabilityResponseDto,
  })
  async updateByRiderId(
    @Param('riderId') riderId: string,
    @Body() updateRiderAvailabilityDto: UpdateRiderAvailabilityDto
  ): Promise<RiderAvailabilityResponseDto> {
    return this.riderAvailabilityService.updateByRiderId(
      riderId,
      updateRiderAvailabilityDto
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete rider availability' })
  @ApiParam({ name: 'id', description: 'Rider availability ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Rider availability deleted successfully',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.riderAvailabilityService.remove(id);
  }
}

