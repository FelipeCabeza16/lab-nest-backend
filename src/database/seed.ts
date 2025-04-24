import { DataSource } from 'typeorm';
import { Unit } from '../materials/entities/unit.entity';
import { Material } from '../materials/entities/material.entity';
import { State } from '../location/entities/state.entity';
import { City } from '../location/entities/city.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const unitsSeed = [
  { name: 'UNIDAD', code: 'UN', description: 'UNIDAD DE MEDIDA BÁSICA' },
  { name: 'KILOGRAMO', code: 'KG', description: 'UNIDAD DE MEDIDA DE PESO' },
  { name: 'METRO', code: 'M', description: 'UNIDAD DE MEDIDA DE LONGITUD' },
];

export const materialsSeed = [
  { code: 'CEM-001', description: 'CEMENTO GRIS 50KG', price: 25000 },
  {
    code: 'VAR-001',
    description: 'VARILLA DE ACERO 1/2 PULGADA',
    price: 35000,
  },
  { code: 'LAD-001', description: 'LADRILLO COMÚN', price: 850 },
  { code: 'ARE-001', description: 'ARENA FINA M3', price: 45000 },
  { code: 'PIN-001', description: 'PINTURA LÁTEX 20L', price: 120000 },
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
    entities: [Material, Unit, State, City],
    synchronize: false,
  });

  try {
    await dataSource.initialize();
    console.log('✅ Data Source has been initialized!');

    // Delete existing data in correct order (respecting foreign key constraints)
    await dataSource.getRepository(Material).delete({});
    await dataSource.getRepository(Unit).delete({});
    await dataSource.getRepository(City).delete({});
    await dataSource.getRepository(State).delete({});

    // Insert Units and Materials
    const savedUnits = await dataSource.getRepository(Unit).save(unitsSeed);
    console.log('✅ Units seeded:', savedUnits);

    const savedMaterials = await dataSource.getRepository(Material).save(
      materialsSeed.map((material, index) => ({
        ...material,
        unit: savedUnits[index % savedUnits.length],
      })),
    );
    console.log('✅ Materials seeded:', savedMaterials);

    // Create states
    const states = await Promise.all([
      dataSource.getRepository(State).save({ name: 'ANTIOQUIA' }),
      dataSource.getRepository(State).save({ name: 'ATLÁNTICO' }),
      dataSource.getRepository(State).save({ name: 'BOGOTÁ D.C.' }),
      dataSource.getRepository(State).save({ name: 'BOLÍVAR' }),
      dataSource.getRepository(State).save({ name: 'BOYACÁ' }),
      dataSource.getRepository(State).save({ name: 'CALDAS' }),
      dataSource.getRepository(State).save({ name: 'CAQUETÁ' }),
      dataSource.getRepository(State).save({ name: 'CAUCA' }),
      dataSource.getRepository(State).save({ name: 'CESAR' }),
      dataSource.getRepository(State).save({ name: 'CÓRDOBA' }),
      dataSource.getRepository(State).save({ name: 'CUNDINAMARCA' }),
      dataSource.getRepository(State).save({ name: 'CHOCÓ' }),
      dataSource.getRepository(State).save({ name: 'HUILA' }),
      dataSource.getRepository(State).save({ name: 'LA GUAJIRA' }),
      dataSource.getRepository(State).save({ name: 'MAGDALENA' }),
      dataSource.getRepository(State).save({ name: 'META' }),
      dataSource.getRepository(State).save({ name: 'NARIÑO' }),
      dataSource.getRepository(State).save({ name: 'NORTE DE SANTANDER' }),
      dataSource.getRepository(State).save({ name: 'QUINDÍO' }),
      dataSource.getRepository(State).save({ name: 'RISARALDA' }),
      dataSource.getRepository(State).save({ name: 'SANTANDER' }),
      dataSource.getRepository(State).save({ name: 'SUCRE' }),
      dataSource.getRepository(State).save({ name: 'TOLIMA' }),
      dataSource.getRepository(State).save({ name: 'VALLE DEL CAUCA' }),
      dataSource.getRepository(State).save({ name: 'ARAUCA' }),
      dataSource.getRepository(State).save({ name: 'CASANARE' }),
      dataSource.getRepository(State).save({ name: 'PUTUMAYO' }),
      dataSource.getRepository(State).save({ name: 'SAN ANDRÉS' }),
      dataSource.getRepository(State).save({ name: 'AMAZONAS' }),
      dataSource.getRepository(State).save({ name: 'GUAINÍA' }),
      dataSource.getRepository(State).save({ name: 'GUAVIARE' }),
      dataSource.getRepository(State).save({ name: 'VAUPÉS' }),
      dataSource.getRepository(State).save({ name: 'VICHADA' }),
    ]);
    console.log('✅ States seeded:', states);

    // Create cities
    const cities = await Promise.all([
      // Antioquia
      dataSource.getRepository(City).save({ name: 'MEDELLÍN', state: states[0] }),
      dataSource.getRepository(City).save({ name: 'BELLO', state: states[0] }),
      dataSource.getRepository(City).save({ name: 'ENVIGADO', state: states[0] }),
      // Atlántico
      dataSource.getRepository(City).save({ name: 'BARRANQUILLA', state: states[1] }),
      dataSource.getRepository(City).save({ name: 'SOLEDAD', state: states[1] }),
      // Bogotá D.C.
      dataSource.getRepository(City).save({ name: 'BOGOTÁ', state: states[2] }),
      // Valle del Cauca
      dataSource.getRepository(City).save({ name: 'CALI', state: states[23] }),
      dataSource.getRepository(City).save({ name: 'PALMIRA', state: states[23] }),
      dataSource.getRepository(City).save({ name: 'BUENAVENTURA', state: states[23] }),
    ]);
    console.log('✅ Cities seeded:', cities);

    console.log('✅ Seeding completed!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await dataSource.destroy();
  }
}

seed();
