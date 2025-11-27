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
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleResponseDto } from './dto/vehicle-response.dto';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new vehicle' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Vehicle created successfully',
    type: VehicleResponseDto,
  })
  async create(@Body() createVehicleDto: CreateVehicleDto): Promise<VehicleResponseDto> {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all vehicles' })
  @ApiQuery({
    name: 'riderId',
    required: false,
    description: 'Filter by rider ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of vehicles retrieved successfully',
  })
  async findAll(@Query('riderId') riderId?: string) {
    return this.vehiclesService.findAll(riderId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a vehicle by ID' })
  @ApiParam({ name: 'id', description: 'Vehicle ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Vehicle retrieved successfully',
    type: VehicleResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<VehicleResponseDto> {
    return this.vehiclesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a vehicle' })
  @ApiParam({ name: 'id', description: 'Vehicle ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Vehicle updated successfully',
    type: VehicleResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto
  ): Promise<VehicleResponseDto> {
    return this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a vehicle' })
  @ApiParam({ name: 'id', description: 'Vehicle ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Vehicle deleted successfully',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.vehiclesService.remove(id);
  }
}

