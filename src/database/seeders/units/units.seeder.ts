import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from '../../../materials/entities/unit.entity';
import { units } from './units.seed';

@Injectable()
export class UnitsSeeder {
  constructor(
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
  ) {}

  async seed() {
    const existingUnits = await this.unitRepository.find();
    if (existingUnits.length === 0) {
      await this.unitRepository.save(units);
      console.log('Units seeded successfully');
    } else {
      console.log('Units already exist, skipping seeding');
    }
  }
} 