import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1744213810327 implements MigrationInterface {
    name = 'Migration1744213810327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "material" DROP COLUMN "minimumStock"`);
        await queryRunner.query(`ALTER TABLE "material" DROP COLUMN "currentStock"`);
        await queryRunner.query(`ALTER TABLE "material" DROP COLUMN "supplier"`);
        await queryRunner.query(`ALTER TABLE "material" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "material" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "material" DROP COLUMN "notes"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "material" ADD "notes" character varying`);
        await queryRunner.query(`ALTER TABLE "material" ADD "category" character varying`);
        await queryRunner.query(`ALTER TABLE "material" ADD "location" character varying`);
        await queryRunner.query(`ALTER TABLE "material" ADD "supplier" character varying`);
        await queryRunner.query(`ALTER TABLE "material" ADD "currentStock" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "material" ADD "minimumStock" integer NOT NULL`);
    }

}
