import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProjectsService } from '../services/projects.service';
import { CreateProjectDto } from '../dtos/project.dto';
import { UpdateProjectDto } from '../dtos/project.dto';
import { AddMaterialToProjectDto } from '../dtos/project.dto';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({ status: 201, description: 'The project has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Body() createProjectDto: CreateProjectDto) {
    return await this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({ status: 200, description: 'Return all projects.' })
  async findAll() {
    return await this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project by id' })
  @ApiResponse({ status: 200, description: 'Return the project.' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  async findOne(@Param('id') id: string) {
    return await this.projectsService.findOne(id);
  }

  @Get(':id/materials')
  @ApiOperation({ summary: 'Get all materials for a project' })
  @ApiResponse({ status: 200, description: 'Return all materials for the project.' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  async getProjectMaterials(@Param('id') id: string) {
    const project = await this.projectsService.findOne(id);
    return project.projectMaterials;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a project' })
  @ApiResponse({ status: 200, description: 'The project has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return await this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a project' })
  @ApiResponse({ status: 204, description: 'The project has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  async remove(@Param('id') id: string) {
    await this.projectsService.remove(id);
  }

  @Post(':id/materials')
  @ApiOperation({ summary: 'Add a material to a project' })
  @ApiResponse({ status: 200, description: 'The material has been successfully added to the project.' })
  @ApiResponse({ status: 404, description: 'Project or material not found.' })
  async addMaterial(@Param('id') id: string, @Body() addMaterialDto: AddMaterialToProjectDto) {
    return await this.projectsService.addMaterial(id, addMaterialDto);
  }

  @Delete(':id/materials/:materialId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a material from a project' })
  @ApiResponse({ status: 204, description: 'The material has been successfully removed from the project.' })
  @ApiResponse({ status: 404, description: 'Project or material not found.' })
  async removeMaterial(@Param('id') id: string, @Param('materialId') materialId: string) {
    await this.projectsService.removeMaterial(id, materialId);
  }
}
