import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from '../../materials/entities/unit.entity';

@Injectable()
export class UnitsSeeder {
  constructor(
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
  ) {}

  async seed() {
    const units = [
      { name: 'UNIDAD', code: 'UN', description: 'UNIDAD DE MEDIDA BÁSICA' },
      { name: 'KILOGRAMO', code: 'KG', description: 'UNIDAD DE MEDIDA DE PESO' },
      { name: 'METRO', code: 'M', description: 'UNIDAD DE MEDIDA DE LONGITUD' },
    ];

    const savedUnits = await this.unitRepository.save(units);
    console.log('Units seeded:', savedUnits);
    return savedUnits;
  }
} 