import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from '../entities/unit.entity';
import { CreateUnitDto, UpdateUnitDto } from '../dtos/unit.dto';

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
  ) {}

  async create(createUnitDto: CreateUnitDto): Promise<Unit> {
    const unit = this.unitRepository.create(createUnitDto);
    return this.unitRepository.save(unit);
  }

  async findAll(): Promise<Unit[]> {
    return this.unitRepository.find();
  }

  async findOne(id: string): Promise<Unit> {
    const unit = await this.unitRepository.findOne({ where: { id } });
    if (!unit) {
      throw new NotFoundException(`Unit with ID "${id}" not found`);
    }
    return unit;
  }

  async update(id: string, updateUnitDto: UpdateUnitDto): Promise<Unit> {
    const unit = await this.findOne(id);
    Object.assign(unit, updateUnitDto);
    return this.unitRepository.save(unit);
  }

  async remove(id: string): Promise<void> {
    const result = await this.unitRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Unit with ID "${id}" not found`);
    }
  }
}
