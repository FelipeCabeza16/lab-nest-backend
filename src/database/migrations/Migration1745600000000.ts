import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1745600000000 implements MigrationInterface {
  name = 'Migration1745600000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
    `);

    await queryRunner.query(`
      CREATE TABLE "unit" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "symbol" character varying NOT NULL,
        "description" character varying NOT NULL,
        "code" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        CONSTRAINT "PK_unit_id" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_unit_code" UNIQUE ("code")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "material" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "code" character varying NOT NULL,
        "name" character varying NOT NULL,
        "description" character varying,
        "price" numeric(10,2) NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        "unitId" uuid,
        CONSTRAINT "PK_material_id" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_material_code" UNIQUE ("code"),
        CONSTRAINT "FK_material_unit" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE SET NULL
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "states" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        CONSTRAINT "PK_states_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "cities" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "stateId" uuid NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        CONSTRAINT "PK_cities_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_cities_state" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "project" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "description" character varying,
        "cityId" uuid,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        CONSTRAINT "PK_project_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_project_city" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE SET NULL
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "project_materials" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "projectId" uuid NOT NULL,
        "materialId" uuid NOT NULL,
        "quantity" numeric(10,2) NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        CONSTRAINT "PK_project_materials_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_project_material_project" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_project_material_material" FOREIGN KEY ("materialId") REFERENCES "material"("id") ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "project_materials"`);
    await queryRunner.query(`DROP TABLE "project"`);
    await queryRunner.query(`DROP TABLE "cities"`);
    await queryRunner.query(`DROP TABLE "states"`);
    await queryRunner.query(`DROP TABLE "material"`);
    await queryRunner.query(`DROP TABLE "unit"`);
  }
}
