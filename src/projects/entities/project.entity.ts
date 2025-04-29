import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { City } from '../../location/entities/city.entity';
import { ProjectMaterial } from './project-material.entity';

@Entity('project')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'cityId' })
  city: City;

  @OneToMany(
    () => ProjectMaterial,
    (projectMaterial) => projectMaterial.project,
  )
  projectMaterials: ProjectMaterial[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
