import { DataSource } from 'typeorm';
import { Unit } from '../materials/entities/unit.entity';
import { Material } from '../materials/entities/material.entity';
import { State } from '../location/entities/state.entity';
import { City } from '../location/entities/city.entity';
import { Project } from '../projects/entities/project.entity';
import { ProjectMaterial } from '../projects/entities/project-material.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const unitsSeed = [
  {
    name: 'UNIDAD',
    symbol: 'u',
    code: 'UN',
    description: 'UNIDAD DE MEDIDA BÁSICA',
  },
  {
    name: 'KILOGRAMO',
    symbol: 'kg',
    code: 'KG',
    description: 'UNIDAD DE MEDIDA DE PESO',
  },
  {
    name: 'METRO',
    symbol: 'm',
    code: 'M',
    description: 'UNIDAD DE MEDIDA DE LONGITUD',
  },
];

const materialsSeed = [
  {
    code: 'CEM-001',
    name: 'CEMENTO GRIS 50KG',
    description: 'CEMENTO GRIS 50KG',
    price: 25000,
  },
  {
    code: 'VAR-001',
    name: 'VARILLA DE ACERO 1/2 PULGADA',
    description: 'VARILLA DE ACERO 1/2 PULGADA',
    price: 35000,
  },
  {
    code: 'LAD-001',
    name: 'LADRILLO COMÚN',
    description: 'LADRILLO COMÚN',
    price: 850,
  },
  {
    code: 'ARE-001',
    name: 'ARENA FINA M3',
    description: 'ARENA FINA M3',
    price: 45000,
  },
  {
    code: 'PIN-001',
    name: 'PINTURA LÁTEX 20L',
    description: 'PINTURA LÁTEX 20L',
    price: 120000,
  },
];

const stateCitySeed = [
  { state: 'ANTIOQUIA', cities: ['MEDELLÍN', 'BELLO'] },
  { state: 'VALLE DEL CAUCA', cities: ['CALI'] },
];

const projectSeed = [
  {
    name: 'Mejoramiento Parque Medellín',
    description: 'Obras civiles de renovación urbana',
    cityName: 'MEDELLÍN',
  },
  {
    name: 'Vía Principal Bello',
    description: 'Reparación de vía principal y señalización',
    cityName: 'BELLO',
  },
  {
    name: 'Pintura Institucional Cali',
    description: 'Pintura y embellecimiento de colegios públicos',
    cityName: 'CALI',
  },
];

const projectMaterialsSeed = [
  {
    projectName: 'Mejoramiento Parque Medellín',
    materialCode: 'CEM-001',
    quantity: 100.0,
  },
  {
    projectName: 'Mejoramiento Parque Medellín',
    materialCode: 'VAR-001',
    quantity: 50.0,
  },
  {
    projectName: 'Vía Principal Bello',
    materialCode: 'LAD-001',
    quantity: 200.0,
  },
  {
    projectName: 'Pintura Institucional Cali',
    materialCode: 'PIN-001',
    quantity: 80.0,
  },
];

async function seed() {
  console.log('🌱 Starting seeding...');

  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.TYPEORM_HOST || 'localhost',
    port: parseInt(process.env.TYPEORM_PORT || '5433', 10),
    username: process.env.TYPEORM_USERNAME || 'postgres',
    password: process.env.TYPEORM_PASSWORD || 'postgres',
    database: process.env.TYPEORM_DATABASE || 'postgres',
    entities: [Unit, Material, State, City, Project, ProjectMaterial],
    synchronize: false,
  });

  try {
    await dataSource.initialize();
    console.log('✅ Data Source initialized');

    // Delete in correct order
    await dataSource.getRepository(ProjectMaterial).delete({});
    await dataSource.getRepository(Project).delete({});
    await dataSource.getRepository(Material).delete({});
    await dataSource.getRepository(Unit).delete({});
    await dataSource.getRepository(City).delete({});
    await dataSource.getRepository(State).delete({});

    // Units
    const savedUnits = await dataSource.getRepository(Unit).save(unitsSeed);
    console.log('✅ Units seeded');

    // Materials
    const savedMaterials = await dataSource.getRepository(Material).save(
      materialsSeed.map((m, i) => ({
        ...m,
        unit: savedUnits[i % savedUnits.length],
      })),
    );
    console.log('✅ Materials seeded');

    // States & Cities
    const stateRepo = dataSource.getRepository(State);
    const cityRepo = dataSource.getRepository(City);
    const stateMap: Record<string, State> = {};
    const cityMap: Record<string, City> = {};

    for (const group of stateCitySeed) {
      const state = await stateRepo.save({ name: group.state });
      stateMap[group.state] = state;
      for (const city of group.cities) {
        const savedCity = await cityRepo.save({ name: city, state });
        cityMap[city] = savedCity;
      }
    }
    console.log('✅ States and cities seeded');

    // Projects
    const savedProjects: Record<string, Project> = {};
    for (const p of projectSeed) {
      const project = await dataSource.getRepository(Project).save({
        name: p.name,
        description: p.description,
        city: cityMap[p.cityName],
      });
      savedProjects[p.name] = project;
    }
    console.log('✅ Projects seeded');

    // ProjectMaterials
    for (const pm of projectMaterialsSeed) {
      const material = savedMaterials.find((m) => m.code === pm.materialCode);
      if (!material) throw new Error(`Material ${pm.materialCode} not found`);

      await dataSource.getRepository(ProjectMaterial).save({
        project: savedProjects[pm.projectName],
        material,
        quantity: pm.quantity,
      });
    }
    console.log('✅ ProjectMaterials seeded');

    console.log('🌱 Seeding completed!');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
  } finally {
    await dataSource.destroy();
  }
}

seed();
