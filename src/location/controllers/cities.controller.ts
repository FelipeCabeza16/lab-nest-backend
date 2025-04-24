import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CitiesService } from '../services/cities.service';
import { City } from '../entities/city.entity';

@ApiTags('cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all cities' })
  @ApiResponse({ status: 200, description: 'Return all cities.' })
  async findAll(): Promise<City[]> {
    return await this.citiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a city by id' })
  @ApiResponse({ status: 200, description: 'Return a city.' })
  @ApiResponse({ status: 404, description: 'City not found.' })
  async findOne(@Param('id') id: string): Promise<City> {
    return await this.citiesService.findOne(id);
  }
} 