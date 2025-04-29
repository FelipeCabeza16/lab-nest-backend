import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectsService } from './services/projects.service';
import { Project } from './entities/project.entity';
import { ProjectMaterial } from './entities/project-material.entity';
import { Material } from '../materials/entities/material.entity';
import { City } from '../location/entities/city.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, ProjectMaterial, Material, City]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
