import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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
import { RiderEarningsService } from './rider-earnings.service';
import { CreateRiderEarningDto } from './dto/create-rider-earning.dto';
import { UpdateRiderEarningDto } from './dto/update-rider-earning.dto';
import { RiderEarningResponseDto } from './dto/rider-earning-response.dto';

@ApiTags('rider-earnings')
@Controller('rider-earnings')
export class RiderEarningsController {
  constructor(private readonly riderEarningsService: RiderEarningsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new rider earning' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Rider earning created successfully',
    type: RiderEarningResponseDto,
  })
  async create(
    @Body() createRiderEarningDto: CreateRiderEarningDto
  ): Promise<RiderEarningResponseDto> {
    return this.riderEarningsService.create(createRiderEarningDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rider earnings' })
  @ApiQuery({
    name: 'riderId',
    required: false,
    description: 'Filter by rider ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of rider earnings retrieved successfully',
  })
  async findAll(@Query('riderId') riderId?: string) {
    return this.riderEarningsService.findAll(riderId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a rider earning by ID' })
  @ApiParam({ name: 'id', description: 'Rider earning ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Rider earning retrieved successfully',
    type: RiderEarningResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<RiderEarningResponseDto> {
    return this.riderEarningsService.findOne(id);
  }

  @Get('rider/:riderId/totals')
  @ApiOperation({ summary: 'Get total earnings summary for a rider' })
  @ApiParam({ name: 'riderId', description: 'Rider ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Total earnings summary retrieved successfully',
  })
  async getTotals(@Param('riderId') riderId: string) {
    return this.riderEarningsService.getTotalEarningsByRiderId(riderId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a rider earning' })
  @ApiParam({ name: 'id', description: 'Rider earning ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Rider earning updated successfully',
    type: RiderEarningResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateRiderEarningDto: UpdateRiderEarningDto
  ): Promise<RiderEarningResponseDto> {
    return this.riderEarningsService.update(id, updateRiderEarningDto);
  }
}

