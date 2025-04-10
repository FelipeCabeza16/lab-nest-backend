import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1744315729892 implements MigrationInterface {
    name = 'Migration1744315729892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unit" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "unit" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "unit" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "material" DROP CONSTRAINT "FK_c357cc6b79ec0b39dbff21ca014"`);
        await queryRunner.query(`ALTER TABLE "material" DROP CONSTRAINT "UQ_c357cc6b79ec0b39dbff21ca014"`);
        await queryRunner.query(`ALTER TABLE "material" ADD CONSTRAINT "FK_c357cc6b79ec0b39dbff21ca014" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "material" DROP CONSTRAINT "FK_c357cc6b79ec0b39dbff21ca014"`);
        await queryRunner.query(`ALTER TABLE "material" ADD CONSTRAINT "UQ_c357cc6b79ec0b39dbff21ca014" UNIQUE ("unitId")`);
        await queryRunner.query(`ALTER TABLE "material" ADD CONSTRAINT "FK_c357cc6b79ec0b39dbff21ca014" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "unit" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "unit" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "unit" DROP COLUMN "createdAt"`);
    }

}
