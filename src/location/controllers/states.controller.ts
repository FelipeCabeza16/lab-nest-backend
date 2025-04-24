import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StatesService } from '../services/states.service';
import { State } from '../entities/state.entity';

@ApiTags('states')
@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all states' })
  @ApiResponse({ status: 200, description: 'Return all states.' })
  async findAll(): Promise<State[]> {
    return await this.statesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a state by id' })
  @ApiResponse({ status: 200, description: 'Return a state.' })
  @ApiResponse({ status: 404, description: 'State not found.' })
  async findOne(@Param('id') id: string): Promise<State> {
    return await this.statesService.findOne(id);
  }
} 