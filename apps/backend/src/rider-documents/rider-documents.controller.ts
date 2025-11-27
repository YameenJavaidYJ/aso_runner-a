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
import { RiderDocumentsService } from './rider-documents.service';
import { CreateRiderDocumentDto } from './dto/create-rider-document.dto';
import { UpdateRiderDocumentDto } from './dto/update-rider-document.dto';
import { RiderDocumentResponseDto } from './dto/rider-document-response.dto';

@ApiTags('rider-documents')
@Controller('rider-documents')
export class RiderDocumentsController {
  constructor(
    private readonly riderDocumentsService: RiderDocumentsService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new rider document' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Rider document created successfully',
    type: RiderDocumentResponseDto,
  })
  async create(
    @Body() createRiderDocumentDto: CreateRiderDocumentDto
  ): Promise<RiderDocumentResponseDto> {
    return this.riderDocumentsService.create(createRiderDocumentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rider documents' })
  @ApiQuery({
    name: 'riderId',
    required: false,
    description: 'Filter by rider ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of rider documents retrieved successfully',
  })
  async findAll(@Query('riderId') riderId?: string) {
    return this.riderDocumentsService.findAll(riderId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a rider document by ID' })
  @ApiParam({ name: 'id', description: 'Rider document ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Rider document retrieved successfully',
    type: RiderDocumentResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Rider document not found',
  })
  async findOne(@Param('id') id: string): Promise<RiderDocumentResponseDto> {
    return this.riderDocumentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a rider document' })
  @ApiParam({ name: 'id', description: 'Rider document ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Rider document updated successfully',
    type: RiderDocumentResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateRiderDocumentDto: UpdateRiderDocumentDto
  ): Promise<RiderDocumentResponseDto> {
    return this.riderDocumentsService.update(id, updateRiderDocumentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a rider document' })
  @ApiParam({ name: 'id', description: 'Rider document ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Rider document deleted successfully',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.riderDocumentsService.remove(id);
  }
}

