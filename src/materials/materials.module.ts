import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from './entities/material.entity';
import { Unit } from './entities/unit.entity';
import { MaterialsController } from './controllers/materials.controller';
import { UnitsController } from './controllers/units.controller';
import { MaterialsService } from './services/materials.service';
import { UnitsService } from './services/units.service';

@Module({
  imports: [TypeOrmModule.forFeature([Material, Unit])],
  controllers: [MaterialsController, UnitsController],
  providers: [MaterialsService, UnitsService],
  exports: [MaterialsService, TypeOrmModule],
})
export class MaterialsModule {}
