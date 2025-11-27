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
import { VehicleTypesService } from './vehicle-types.service';
import { CreateVehicleTypeDto } from './dto/create-vehicle-type.dto';
import { UpdateVehicleTypeDto } from './dto/update-vehicle-type.dto';
import { VehicleTypeResponseDto } from './dto/vehicle-type-response.dto';

@ApiTags('vehicle-types')
@Controller('vehicle-types')
export class VehicleTypesController {
  constructor(private readonly vehicleTypesService: VehicleTypesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new vehicle type' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Vehicle type created successfully',
    type: VehicleTypeResponseDto,
  })
  async create(
    @Body() createVehicleTypeDto: CreateVehicleTypeDto
  ): Promise<VehicleTypeResponseDto> {
    return this.vehicleTypesService.create(createVehicleTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all vehicle types' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of vehicle types retrieved successfully',
  })
  async findAll(): Promise<VehicleTypeResponseDto[]> {
    return this.vehicleTypesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a vehicle type by ID' })
  @ApiParam({ name: 'id', description: 'Vehicle type ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Vehicle type retrieved successfully',
    type: VehicleTypeResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<VehicleTypeResponseDto> {
    return this.vehicleTypesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a vehicle type' })
  @ApiParam({ name: 'id', description: 'Vehicle type ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Vehicle type updated successfully',
    type: VehicleTypeResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateVehicleTypeDto: UpdateVehicleTypeDto
  ): Promise<VehicleTypeResponseDto> {
    return this.vehicleTypesService.update(id, updateVehicleTypeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a vehicle type' })
  @ApiParam({ name: 'id', description: 'Vehicle type ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Vehicle type deleted successfully',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.vehicleTypesService.remove(id);
  }
}

