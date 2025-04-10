import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Material } from '../../materials/entities/material.entity';
import { City } from '../../location/entities/city.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Material)
  @JoinTable({
    name: 'project_materials',
    joinColumn: {
      name: 'projectId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'materialId',
      referencedColumnName: 'id',
    },
  })
  materials: Material[];

  @ManyToMany(() => City)
  @JoinTable({
    name: 'project_cities',
    joinColumn: {
      name: 'projectId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'cityId',
      referencedColumnName: 'id',
    },
  })
  cities: City[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
