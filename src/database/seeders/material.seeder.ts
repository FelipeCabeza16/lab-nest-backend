import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from '../../materials/entities/material.entity';
import { Unit } from '../../materials/entities/unit.entity';

@Injectable()
export class MaterialSeeder {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
  ) {}

  async seed(): Promise<void> {
    // Create a test unit if it doesn't exist
    let unit = await this.unitRepository.findOne({ where: { code: 'UN' } });
    if (!unit) {
      unit = this.unitRepository.create({
        code: 'UN',
        description: 'Unit',
      });
      await this.unitRepository.save(unit);
    }

    // Create test materials
    const materials = [
      {
        code: 'CON-001',
        description: 'Concrete',
        unit: unit,
        price: 100.0,
        minimumStock: 10,
        currentStock: 20,
        cost: 80.0,
        supplier: 'Supplier A',
        location: 'Warehouse 1',
        category: 'Construction',
        notes: 'High quality concrete',
      },
      {
        code: 'STE-001',
        description: 'Steel Bars',
        unit: unit,
        price: 50.0,
        minimumStock: 5,
        currentStock: 15,
        cost: 40.0,
        supplier: 'Supplier B',
        location: 'Warehouse 2',
        category: 'Construction',
        notes: 'Reinforcement steel',
      },
    ];

    for (const materialData of materials) {
      const existingMaterial = await this.materialRepository.findOne({
        where: { code: materialData.code },
      });

      if (!existingMaterial) {
        const material = this.materialRepository.create(materialData);
        await this.materialRepository.save(material);
        console.log(
          `Created material: ${material.code} - ${material.description}`,
        );
      }
    }
  }
}
