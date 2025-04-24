import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'src/config';
import { Unit } from '../materials/entities/unit.entity';
import { DatabaseSeeder } from './seeders/database.seeder';
import { UnitsSeeder } from './seeders/units.seeder';
import { LocationSeeder } from './seeders/location.seeder';
import { State } from '../location/entities/state.entity';
import { City } from '../location/entities/city.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, name, password, port } = configService.postgres;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: name,
          autoLoadEntities: true,
          synchronize: false,
        };
      },
    }),
    TypeOrmModule.forFeature([Unit, State, City]),
  ],
  providers: [
    {
      provide: 'APP_NAME',
      useValue: 'NestJS App',
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, name, password, port } = configService.postgres;
        const client = new Client({
          user,
          host,
          database: name,
          password,
          port,
        });
        void client.connect();
        return client;
      },
      inject: [config.KEY],
    },
    DatabaseSeeder,
    UnitsSeeder,
    LocationSeeder,
  ],
  exports: ['APP_NAME', 'PG', DatabaseSeeder],
})
export class DatabaseModule {}
