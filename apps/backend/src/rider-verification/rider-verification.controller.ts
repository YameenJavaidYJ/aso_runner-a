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
import { RiderVerificationService } from './rider-verification.service';
import { CreateVerificationHistoryDto } from './dto/create-verification-history.dto';
import { VerificationHistoryResponseDto } from './dto/verification-history-response.dto';

@ApiTags('rider-verification')
@Controller('rider-verification')
export class RiderVerificationController {
  constructor(
    private readonly riderVerificationService: RiderVerificationService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new verification history entry' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Verification history created successfully',
    type: VerificationHistoryResponseDto,
  })
  async create(
    @Body() createVerificationHistoryDto: CreateVerificationHistoryDto
  ): Promise<VerificationHistoryResponseDto> {
    return this.riderVerificationService.create(createVerificationHistoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all verification history entries' })
  @ApiQuery({
    name: 'riderId',
    required: false,
    description: 'Filter by rider ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of verification history entries retrieved successfully',
  })
  async findAll(@Query('riderId') riderId?: string) {
    return this.riderVerificationService.findAll(riderId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a verification history entry by ID' })
  @ApiParam({ name: 'id', description: 'Verification history ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Verification history retrieved successfully',
    type: VerificationHistoryResponseDto,
  })
  async findOne(
    @Param('id') id: string
  ): Promise<VerificationHistoryResponseDto> {
    return this.riderVerificationService.findOne(id);
  }

  @Get('rider/:riderId')
  @ApiOperation({ summary: 'Get verification history for a specific rider' })
  @ApiParam({ name: 'riderId', description: 'Rider ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Verification history retrieved successfully',
  })
  async findByRiderId(@Param('riderId') riderId: string) {
    return this.riderVerificationService.findByRiderId(riderId);
  }
}

