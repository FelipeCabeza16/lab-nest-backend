import { DataSource } from 'typeorm';
import { Unit } from '../materials/entities/unit.entity';
import { Material } from '../materials/entities/material.entity';
import { State } from '../location/entities/state.entity';
import { City } from '../location/entities/city.entity';
import { Project } from '../projects/entities/project.entity';

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

export async function seed(dataSource: DataSource) {
  console.log('🌱 Starting seeding...');

  try {
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
        state: savedStates[index % savedStates.length], // relación circular segura
      }))
    );

    // Insertar Unidades y Materiales
    const savedUnits = await dataSource.getRepository(Unit).save(unitsSeed);
    await dataSource.getRepository(Material).save(
      materialsSeed.map((material, index) => ({
        ...material,
        unit: savedUnits[index % savedUnits.length],
      }))
    );

    // Insertar Proyectos
    await dataSource.getRepository(Project).save(projectsSeed);

    console.log('✅ Seeding completed.');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  }
}
