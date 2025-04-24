import { Injectable } from '@nestjs/common';
import { UnitsSeeder } from './units.seeder';
import { LocationSeeder } from './location.seeder';

@Injectable()
export class DatabaseSeeder {
  constructor(
    private readonly unitsSeeder: UnitsSeeder,
    private readonly locationSeeder: LocationSeeder,
  ) {}

  async seed() {
    console.log('🌱 Starting seeding...');
    const units = await this.unitsSeeder.seed();
    console.log('✅ Units seeded:', units);

    const { states, cities } = await this.locationSeeder.seed();
    console.log('✅ States seeded:', states);
    console.log('✅ Cities seeded:', cities);

    console.log('✅ Seeding completed!');
  }
} 