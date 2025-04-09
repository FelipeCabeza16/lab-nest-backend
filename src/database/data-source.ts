import { DataSource } from 'typeorm';
import { Material } from '../entities/material.entity';
import { Unit } from '../entities/unit.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST || 'localhost',
  port: parseInt(process.env.TYPEORM_PORT || '5433', 10),
  username: process.env.TYPEORM_USERNAME || 'postgres',
  password: process.env.TYPEORM_PASSWORD || 'postgres',
  database: process.env.TYPEORM_DATABASE || 'postgres',
  entities: [Material, Unit],
  migrations: [
    process.env.TYPEORM_MIGRATIONS || 'src/database/migrations/*.ts',
  ],
  migrationsTableName:
    process.env.TYPEORM_MIGRATIONS_TABLE_NAME || 'migrations',
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  logging: process.env.TYPEORM_LOGGING === 'true',
});
