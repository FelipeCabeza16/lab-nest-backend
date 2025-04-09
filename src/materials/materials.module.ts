import { Module } from '@nestjs/common';
import { MaterialsService } from './services/materials.service';
import { MaterialsController } from './controllers/materials.controller';
import { UnitsService } from './services/units.service';
import { UnitsController } from './controllers/units.controller';

@Module({
  providers: [MaterialsService, UnitsService],
  controllers: [MaterialsController, UnitsController],
  exports: [MaterialsService],
})
export class MaterialsModule {}
