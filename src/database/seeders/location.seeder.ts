import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from '../../location/entities/state.entity';
import { City } from '../../location/entities/city.entity';

@Injectable()
export class LocationSeeder {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}

  async seed() {
    // Create states
    const states = await Promise.all([
      this.stateRepository.save({ name: 'ANTIOQUIA' }),
      this.stateRepository.save({ name: 'ATLÁNTICO' }),
      this.stateRepository.save({ name: 'BOGOTÁ D.C.' }),
      this.stateRepository.save({ name: 'BOLÍVAR' }),
      this.stateRepository.save({ name: 'BOYACÁ' }),
      this.stateRepository.save({ name: 'CALDAS' }),
      this.stateRepository.save({ name: 'CAQUETÁ' }),
      this.stateRepository.save({ name: 'CAUCA' }),
      this.stateRepository.save({ name: 'CESAR' }),
      this.stateRepository.save({ name: 'CÓRDOBA' }),
      this.stateRepository.save({ name: 'CUNDINAMARCA' }),
      this.stateRepository.save({ name: 'CHOCÓ' }),
      this.stateRepository.save({ name: 'HUILA' }),
      this.stateRepository.save({ name: 'LA GUAJIRA' }),
      this.stateRepository.save({ name: 'MAGDALENA' }),
      this.stateRepository.save({ name: 'META' }),
      this.stateRepository.save({ name: 'NARIÑO' }),
      this.stateRepository.save({ name: 'NORTE DE SANTANDER' }),
      this.stateRepository.save({ name: 'QUINDÍO' }),
      this.stateRepository.save({ name: 'RISARALDA' }),
      this.stateRepository.save({ name: 'SANTANDER' }),
      this.stateRepository.save({ name: 'SUCRE' }),
      this.stateRepository.save({ name: 'TOLIMA' }),
      this.stateRepository.save({ name: 'VALLE DEL CAUCA' }),
      this.stateRepository.save({ name: 'ARAUCA' }),
      this.stateRepository.save({ name: 'CASANARE' }),
      this.stateRepository.save({ name: 'PUTUMAYO' }),
      this.stateRepository.save({ name: 'SAN ANDRÉS' }),
      this.stateRepository.save({ name: 'AMAZONAS' }),
      this.stateRepository.save({ name: 'GUAINÍA' }),
      this.stateRepository.save({ name: 'GUAVIARE' }),
      this.stateRepository.save({ name: 'VAUPÉS' }),
      this.stateRepository.save({ name: 'VICHADA' }),
    ]);

    console.log('Estados creados:', states.length);

    // Create cities for some states
    const cities = await Promise.all([
      // Antioquia
      this.cityRepository.save({ name: 'Medellín', state: states[0] }),
      this.cityRepository.save({ name: 'Bello', state: states[0] }),
      this.cityRepository.save({ name: 'Envigado', state: states[0] }),

      // Atlántico
      this.cityRepository.save({ name: 'Barranquilla', state: states[1] }),
      this.cityRepository.save({ name: 'Soledad', state: states[1] }),

      // Bogotá D.C.
      this.cityRepository.save({ name: 'Bogotá', state: states[2] }),

      // Valle del Cauca
      this.cityRepository.save({ name: 'Cali', state: states[23] }),
      this.cityRepository.save({ name: 'Palmira', state: states[23] }),
      this.cityRepository.save({ name: 'Buenaventura', state: states[23] }),
    ]);

    console.log('Ciudades creadas:', cities.length);

    return { states, cities };
  }
}
