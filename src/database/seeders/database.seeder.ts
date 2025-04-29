import { Injectable } from '@nestjs/common';
import { UnitsSeeder } from './units.seeder';
import { LocationSeeder } from './location.seeder';
import { MaterialSeeder } from './material.seeder';

@Injectable()
export class DatabaseSeeder {
  constructor(
    private readonly unitsSeeder: UnitsSeeder,
    private readonly locationSeeder: LocationSeeder,
    private readonly materialSeeder: MaterialSeeder,
  ) {}

  async seed(): Promise<void> {
    await this.unitsSeeder.seed();
    await this.locationSeeder.seed();
    await this.materialSeeder.seed();
  }
}
