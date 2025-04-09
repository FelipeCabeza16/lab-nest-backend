import { DataSource } from 'typeorm';
import { Material } from '../materials/entities/material.entity';
import { Unit } from '../materials/entities/unit.entity';
import { State } from '../location/entities/state.entity';
import { City } from '../location/entities/city.entity';
import { Project } from '../projects/entities/project.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST || 'localhost',
  port: parseInt(process.env.TYPEORM_PORT || '5433', 10),
  username: process.env.TYPEORM_USERNAME || 'postgres',
  password: process.env.TYPEORM_PASSWORD || 'postgres',
  database: process.env.TYPEORM_DATABASE || 'postgres',
  entities: [Material, Unit, State, City, Project],
  migrations: [
    process.env.TYPEORM_MIGRATIONS || 'src/database/migrations/*.ts',
  ],
  migrationsTableName:
    process.env.TYPEORM_MIGRATIONS_TABLE_NAME || 'migrations',
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  logging: process.env.TYPEORM_LOGGING === 'true',
});
