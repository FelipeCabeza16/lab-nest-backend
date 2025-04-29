import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { CreateProjectDto } from '../dtos/project.dto';
import { UpdateProjectDto } from '../dtos/project.dto';
import { AddMaterialToProjectDto } from '../dtos/project.dto';
import { ProjectMaterial } from '../entities/project-material.entity';
import { Material } from '../../materials/entities/material.entity';
import { City } from '../../location/entities/city.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(ProjectMaterial)
    private readonly projectMaterialRepository: Repository<ProjectMaterial>,
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const { cityId, ...projectData } = createProjectDto;

    const city = await this.cityRepository.findOne({
      where: { id: cityId },
    });

    if (!city) {
      throw new NotFoundException(`City with ID ${cityId} not found`);
    }

    const project = this.projectRepository.create({
      ...projectData,
      city,
    });

    return this.projectRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      relations: ['city', 'projectMaterials', 'projectMaterials.material'],
    });
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['city', 'projectMaterials', 'projectMaterials.material'],
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.findOne(id);

    if (updateProjectDto.cityId) {
      const city = await this.cityRepository.findOne({
        where: { id: updateProjectDto.cityId },
      });

      if (!city) {
        throw new NotFoundException(
          `City with ID ${updateProjectDto.cityId} not found`,
        );
      }

      project.city = city;
    }

    Object.assign(project, updateProjectDto);

    return this.projectRepository.save(project);
  }

  async remove(id: string): Promise<void> {
    const project = await this.findOne(id);
    await this.projectRepository.remove(project);
  }

  async addMaterial(
    id: string,
    addMaterialDto: AddMaterialToProjectDto,
  ): Promise<Project> {
    const project = await this.findOne(id);
    const material = await this.materialRepository.findOne({
      where: { id: addMaterialDto.materialId },
    });

    if (!material) {
      throw new NotFoundException(
        `Material with IDDD ${addMaterialDto.materialId} not found`,
      );
    }

    const projectMaterial = this.projectMaterialRepository.create({
      project,
      material,
      quantity: addMaterialDto.quantity,
    });

    await this.projectMaterialRepository.save(projectMaterial);
    return await this.findOne(id);
  }

  async removeMaterial(id: string, materialId: string): Promise<Project> {
    const projectMaterial = await this.projectMaterialRepository.findOne({
      where: {
        project: { id },
        material: { id: materialId },
      },
    });

    if (!projectMaterial) {
      throw new NotFoundException(
        `Material with ID ${materialId} not found in project ${id}`,
      );
    }

    await this.projectMaterialRepository.remove(projectMaterial);
    return await this.findOne(id);
  }
}
