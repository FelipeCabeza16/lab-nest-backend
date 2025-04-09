import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Material } from './material.entity';

@Entity()
export class Unit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToOne(() => Material, (material) => material.unit)
  material: Material;
}
 
