import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'src/config';
import { Unit } from '../materials/entities/unit.entity';

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
    TypeOrmModule.forFeature([Unit]),
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
  ],
  exports: ['APP_NAME', 'PG'],
})
export class DatabaseModule {}
