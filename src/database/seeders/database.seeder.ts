import { Injectable } from '@nestjs/common';
import { UnitsSeeder } from './units/units.seeder';

@Injectable()
export class DatabaseSeeder {
  constructor(
    private readonly unitsSeeder: UnitsSeeder,
  ) {}

  async seed() {
    await this.unitsSeeder.seed();
  }
} 