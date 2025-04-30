import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMaterialDto, UpdateMaterialDto } from '../dtos/material.dto';
import { UnitsService } from './units.service';
import { Material } from '../entities/material.entity';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
    private readonly unitsService: UnitsService,
  ) {}

  async create(createMaterialDto: CreateMaterialDto): Promise<Material> {
    const { unitId, ...materialData } = createMaterialDto;
    const unit = await this.unitsService.findOne(unitId);

    const material = this.materialRepository.create({
      ...materialData,
      unit,
    });

    return this.materialRepository.save(material);
  }

  async findAll(): Promise<Material[]> {
    return this.materialRepository.find({
      relations: ['unit'],
    });
  }

  async findOne(id: string): Promise<Material> {
    const material = await this.materialRepository.findOne({
      where: { id },
      relations: ['unit'],
    });

    if (!material) {
      throw new NotFoundException(`Material with ID "${id}" not found`);
    }

    return material;
  }

  async update(
    id: string,
    updateMaterialDto: UpdateMaterialDto,
  ): Promise<Material> {
    const { unitId, ...materialData } = updateMaterialDto;
    const material = await this.findOne(id);

    if (unitId) {
      const unit = await this.unitsService.findOne(unitId);
      material.unit = unit;
    }

    Object.assign(material, materialData);
    return this.materialRepository.save(material);
  }

  async remove(id: string): Promise<void> {
    const result = await this.materialRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Material with ID "${id}" not found`);
    }
  }

  async findByCode(code: string): Promise<Material> {
    const material = await this.materialRepository.findOne({
      where: { code },
      relations: ['unit'],
    });

    if (!material) {
      throw new NotFoundException(`Material with code "${code}" not found`);
    }

    return material;
  }
}
