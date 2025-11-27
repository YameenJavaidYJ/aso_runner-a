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
import { RiderPayoutsService } from './rider-payouts.service';
import { CreateRiderPayoutDto } from './dto/create-rider-payout.dto';
import { UpdateRiderPayoutDto } from './dto/update-rider-payout.dto';
import { RiderPayoutResponseDto } from './dto/rider-payout-response.dto';

@ApiTags('rider-payouts')
@Controller('rider-payouts')
export class RiderPayoutsController {
  constructor(private readonly riderPayoutsService: RiderPayoutsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new rider payout' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Rider payout created successfully',
    type: RiderPayoutResponseDto,
  })
  async create(
    @Body() createRiderPayoutDto: CreateRiderPayoutDto
  ): Promise<RiderPayoutResponseDto> {
    return this.riderPayoutsService.create(createRiderPayoutDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rider payouts' })
  @ApiQuery({
    name: 'riderId',
    required: false,
    description: 'Filter by rider ID',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filter by payout status',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of rider payouts retrieved successfully',
  })
  async findAll(
    @Query('riderId') riderId?: string,
    @Query('status') status?: string
  ) {
    if (status) {
      return this.riderPayoutsService.findByStatus(status);
    }
    return this.riderPayoutsService.findAll(riderId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a rider payout by ID' })
  @ApiParam({ name: 'id', description: 'Rider payout ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Rider payout retrieved successfully',
    type: RiderPayoutResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<RiderPayoutResponseDto> {
    return this.riderPayoutsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a rider payout' })
  @ApiParam({ name: 'id', description: 'Rider payout ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Rider payout updated successfully',
    type: RiderPayoutResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateRiderPayoutDto: UpdateRiderPayoutDto
  ): Promise<RiderPayoutResponseDto> {
    return this.riderPayoutsService.update(id, updateRiderPayoutDto);
  }
}

