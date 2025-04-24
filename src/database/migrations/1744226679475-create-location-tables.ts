import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1744226679475 implements MigrationInterface {
  name = 'Migration1744226679475';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Crear tabla de estados
    await queryRunner.query(`
      CREATE TABLE "states" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_states_id" PRIMARY KEY ("id")
      )
    `);

    // Crear tabla de ciudades
    await queryRunner.query(`
      CREATE TABLE "cities" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "stateId" uuid NOT NULL,
        CONSTRAINT "PK_cities_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_cities_stateId" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "cities"`);
    await queryRunner.query(`DROP TABLE "states"`);
  }
} 