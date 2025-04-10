import { DataSource } from 'typeorm';
import { Unit } from '../materials/entities/unit.entity';
import { Material } from '../materials/entities/material.entity';
import { State } from '../location/entities/state.entity';
import { City } from '../location/entities/city.entity';
import { Project } from '../projects/entities/project.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const statesSeed = [
  { name: 'SANTANDER' },
  { name: 'ANTIOQUIA' },
  { name: 'CUNDINAMARCA' },
  { name: 'VALLE DEL CAUCA' },
  { name: 'ATLÁNTICO' },
  { name: 'BOYACÁ' },
  { name: 'NARIÑO' },
  { name: 'TOLIMA' },
  { name: 'HUILA' },
  { name: 'META' },
];

export const citiesSeed = [
  { name: 'BUCARAMANGA' },
  { name: 'MEDELLÍN' },
  { name: 'BOGOTÁ' },
  { name: 'CALI' },
  { name: 'BARRANQUILLA' },
  { name: 'TUNJA' },
  { name: 'PASTO' },
  { name: 'IBAGUÉ' },
  { name: 'NEIVA' },
  { name: 'VILLAVICENCIO' },
];

export const unitsSeed = [
  { name: 'UNIDAD', description: 'UNIDAD DE MEDIDA BÁSICA' },
  { name: 'KILOGRAMO', description: 'UNIDAD DE MEDIDA DE PESO' },
  { name: 'METRO', description: 'UNIDAD DE MEDIDA DE LONGITUD' },
];

export const materialsSeed = [
  { code: 'CEM-001', description: 'CEMENTO GRIS 50KG', price: 25000 },
  { code: 'VAR-001', description: 'VARILLA DE ACERO 1/2 PULGADA', price: 35000 },
  { code: 'LAD-001', description: 'LADRILLO COMÚN', price: 850 },
  { code: 'ARE-001', description: 'ARENA FINA M3', price: 45000 },
  { code: 'PIN-001', description: 'PINTURA LÁTEX 20L', price: 120000 },
];

export const projectsSeed = [
  {
    name: 'CONJUNTO RESIDENCIAL LAS PALMAS',
    description: 'PROYECTO DE 100 APARTAMENTOS DE INTERÉS SOCIAL',
  },
  {
    name: 'CENTRO COMERCIAL PLAZA MAYOR',
    description: 'COMPLEJO COMERCIAL DE 5 NIVELES',
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
    entities: [Material, Unit, State, City, Project],
    synchronize: true,
  });

  try {
    await dataSource.initialize();
    console.log('✅ Data Source has been initialized!');

    // Borrar tablas intermedias primero
    await dataSource.getRepository('project_materials').delete({});
    await dataSource.getRepository('project_cities').delete({});

    // Luego las entidades principales
    await dataSource.getRepository(Project).delete({});
    await dataSource.getRepository(Material).delete({});
    await dataSource.getRepository(Unit).delete({});
    await dataSource.getRepository(City).delete({});
    await dataSource.getRepository(State).delete({});

    // Insertar Estados y Ciudades (relación 1:1 por simplicidad)
    const savedStates = await dataSource.getRepository(State).save(statesSeed);
    const savedCities = await dataSource.getRepository(City).save(
      citiesSeed.map((city, index) => ({
        ...city,
        state: savedStates[index % savedStates.length],
      })),
    );

    // Insertar Unidades y Materiales
    const savedUnits = await dataSource.getRepository(Unit).save(unitsSeed);
    const savedMaterials = await dataSource.getRepository(Material).save(
      materialsSeed.map((material, index) => ({
        ...material,
        unit: savedUnits[index % savedUnits.length],
      })),
    );

    // Insertar Proyectos
    const savedProjects = await dataSource.getRepository(Project).save(projectsSeed);

    // Crear relaciones many-to-many
    // Proyecto 1 (Las Palmas) con materiales 1, 2, 3 y ciudades 1, 2
    await dataSource
      .createQueryBuilder()
      .relation(Project, 'materials')
      .of(savedProjects[0])
      .add([savedMaterials[0], savedMaterials[1], savedMaterials[2]]);

    await dataSource
      .createQueryBuilder()
      .relation(Project, 'cities')
      .of(savedProjects[0])
      .add([savedCities[0], savedCities[1]]);

    // Proyecto 2 (Plaza Mayor) con materiales 3, 4, 5 y ciudades 2, 3
    await dataSource
      .createQueryBuilder()
      .relation(Project, 'materials')
      .of(savedProjects[1])
      .add([savedMaterials[2], savedMaterials[3], savedMaterials[4]]);

    await dataSource
      .createQueryBuilder()
      .relation(Project, 'cities')
      .of(savedProjects[1])
      .add([savedCities[1], savedCities[2]]);

    console.log('✅ Seeding completed.');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } finally {
    await dataSource.destroy();
  }
}

seed();
