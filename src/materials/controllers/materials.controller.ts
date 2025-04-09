import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MaterialsService } from '../services/materials.service';
import {
  CreateMaterialDto,
  UpdateMaterialDto,
  MaterialResponseDto,
} from '../dtos/material.dto';

@ApiTags('materials')
@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new material' })
  @ApiResponse({
    status: 201,
    description: 'Material created successfully',
    type: MaterialResponseDto,
  })
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialsService.create(createMaterialDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all materials' })
  @ApiResponse({
    status: 200,
    description: 'Return all materials',
    type: [MaterialResponseDto],
  })
  findAll() {
    return this.materialsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a material by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the material',
    type: MaterialResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Material not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.materialsService.findOne(id);
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'Get a material by code' })
  @ApiResponse({
    status: 200,
    description: 'Return the material',
    type: MaterialResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Material not found' })
  findByCode(@Param('code') code: string) {
    return this.materialsService.findByCode(code);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a material' })
  @ApiResponse({
    status: 200,
    description: 'Material updated successfully',
    type: MaterialResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Material not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.materialsService.update(id, updateMaterialDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a material' })
  @ApiResponse({ status: 200, description: 'Material deleted successfully' })
  @ApiResponse({ status: 404, description: 'Material not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.materialsService.remove(id);
  }
}
