import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMaterialsAndUnits1744226679476 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create units table first
    await queryRunner.query(`
      CREATE TABLE "units" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "description" character varying NOT NULL,
        "code" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_units_name" UNIQUE ("name"),
        CONSTRAINT "UQ_units_code" UNIQUE ("code"),
        CONSTRAINT "PK_units" PRIMARY KEY ("id")
      )
    `);

    // Then create materials table with foreign key to units
    await queryRunner.query(`
      CREATE TABLE "materials" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "code" character varying NOT NULL,
        "description" character varying NOT NULL,
        "price" decimal(10,2) NOT NULL,
        "unitId" uuid NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_materials_code" UNIQUE ("code"),
        CONSTRAINT "PK_materials" PRIMARY KEY ("id"),
        CONSTRAINT "FK_materials_unitId" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop materials table first (because it has the foreign key)
    await queryRunner.query('DROP TABLE "materials"');
    // Then drop units table
    await queryRunner.query('DROP TABLE "units"');
  }
} 