import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from '../entities/state.entity';

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
  ) {}

  async findAll(): Promise<State[]> {
    return this.stateRepository.find({
      relations: ['cities'],
    });
  }

  async findOne(id: string): Promise<State> {
    const state = await this.stateRepository.findOne({
      where: { id },
      relations: ['cities'],
    });

    if (!state) {
      throw new NotFoundException(`State with ID ${id} not found`);
    }

    return state;
  }
} 