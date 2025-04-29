import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { Material } from '../../materials/entities/material.entity';

@Entity('project_materials')
export class ProjectMaterial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, (project) => project.projectMaterials)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @ManyToOne(() => Material)
  @JoinColumn({ name: 'materialId' })
  material: Material;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
