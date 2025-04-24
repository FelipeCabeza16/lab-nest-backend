import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { State } from './entities/state.entity';
import { CitiesController } from './controllers/cities.controller';
import { StatesController } from './controllers/states.controller';
import { CitiesService } from './services/cities.service';
import { StatesService } from './services/states.service';

@Module({
  imports: [TypeOrmModule.forFeature([City, State])],
  controllers: [CitiesController, StatesController],
  providers: [CitiesService, StatesService],
  exports: [CitiesService, StatesService],
})
export class LocationModule {}
