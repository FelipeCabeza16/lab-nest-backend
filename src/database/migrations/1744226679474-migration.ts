import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1744226679474 implements MigrationInterface {
  name = 'Migration1744226679474';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Primero agregamos la columna como nullable
    await queryRunner.query(`ALTER TABLE "unit" ADD "code" character varying`);
    
    // Actualizamos los registros existentes con códigos por defecto
    await queryRunner.query(`
      UPDATE "unit" 
      SET "code" = CASE 
        WHEN "name" = 'UNIDAD' THEN 'UN'
        WHEN "name" = 'KILOGRAMO' THEN 'KG'
        WHEN "name" = 'METRO' THEN 'M'
        ELSE 'OTRO'
      END
    `);
    
    // Ahora hacemos la columna NOT NULL
    await queryRunner.query(`ALTER TABLE "unit" ALTER COLUMN "code" SET NOT NULL`);
    
    // Agregamos la restricción única
    await queryRunner.query(`ALTER TABLE "unit" ADD CONSTRAINT "UQ_unit_code" UNIQUE ("code")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "unit" DROP CONSTRAINT "UQ_unit_code"`);
    await queryRunner.query(`ALTER TABLE "unit" DROP COLUMN "code"`);
  }
} 