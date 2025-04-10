import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1744316868926 implements MigrationInterface {
    name = 'Migration1744316868926'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unit" ADD "code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "unit" ADD CONSTRAINT "UQ_dfb75cdb2a790fb84327e1d1b15" UNIQUE ("code")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unit" DROP CONSTRAINT "UQ_dfb75cdb2a790fb84327e1d1b15"`);
        await queryRunner.query(`ALTER TABLE "unit" DROP COLUMN "code"`);
    }

}
