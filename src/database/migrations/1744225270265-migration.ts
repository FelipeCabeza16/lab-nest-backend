import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1744225270265 implements MigrationInterface {
    name = 'Migration1744225270265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_materials" ("projectId" uuid NOT NULL, "materialId" uuid NOT NULL, CONSTRAINT "PK_cdeee7f8a5cf72e07bc11f3087c" PRIMARY KEY ("projectId", "materialId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5400e7b44258b1b9781a0873c2" ON "project_materials" ("projectId") `);
        await queryRunner.query(`CREATE INDEX "IDX_64bc2f6a11c065f18aed507f31" ON "project_materials" ("materialId") `);
        await queryRunner.query(`CREATE TABLE "project_cities" ("projectId" uuid NOT NULL, "cityId" uuid NOT NULL, CONSTRAINT "PK_f73efd10a188314f31babe7fca3" PRIMARY KEY ("projectId", "cityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_adb31681fc86e7e980c0914f3f" ON "project_cities" ("projectId") `);
        await queryRunner.query(`CREATE INDEX "IDX_899f602062d68278d4411fa351" ON "project_cities" ("cityId") `);
        await queryRunner.query(`ALTER TABLE "unit" DROP COLUMN "symbol"`);
        await queryRunner.query(`ALTER TABLE "unit" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "unit" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "material" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "material" DROP COLUMN "cost"`);
        await queryRunner.query(`ALTER TABLE "material" ADD "price" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "unit" ADD CONSTRAINT "UQ_5618100486bb99d78de022e5829" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "material" DROP CONSTRAINT "FK_c357cc6b79ec0b39dbff21ca014"`);
        await queryRunner.query(`ALTER TABLE "material" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "material" ADD CONSTRAINT "UQ_c357cc6b79ec0b39dbff21ca014" UNIQUE ("unitId")`);
        await queryRunner.query(`ALTER TABLE "material" ADD CONSTRAINT "FK_c357cc6b79ec0b39dbff21ca014" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_materials" ADD CONSTRAINT "FK_5400e7b44258b1b9781a0873c2e" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_materials" ADD CONSTRAINT "FK_64bc2f6a11c065f18aed507f31f" FOREIGN KEY ("materialId") REFERENCES "material"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_cities" ADD CONSTRAINT "FK_adb31681fc86e7e980c0914f3f4" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_cities" ADD CONSTRAINT "FK_899f602062d68278d4411fa3518" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_cities" DROP CONSTRAINT "FK_899f602062d68278d4411fa3518"`);
        await queryRunner.query(`ALTER TABLE "project_cities" DROP CONSTRAINT "FK_adb31681fc86e7e980c0914f3f4"`);
        await queryRunner.query(`ALTER TABLE "project_materials" DROP CONSTRAINT "FK_64bc2f6a11c065f18aed507f31f"`);
        await queryRunner.query(`ALTER TABLE "project_materials" DROP CONSTRAINT "FK_5400e7b44258b1b9781a0873c2e"`);
        await queryRunner.query(`ALTER TABLE "material" DROP CONSTRAINT "FK_c357cc6b79ec0b39dbff21ca014"`);
        await queryRunner.query(`ALTER TABLE "material" DROP CONSTRAINT "UQ_c357cc6b79ec0b39dbff21ca014"`);
        await queryRunner.query(`ALTER TABLE "material" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "material" ADD CONSTRAINT "FK_c357cc6b79ec0b39dbff21ca014" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "unit" DROP CONSTRAINT "UQ_5618100486bb99d78de022e5829"`);
        await queryRunner.query(`ALTER TABLE "material" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "material" ADD "cost" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "material" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "unit" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "unit" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "unit" ADD "symbol" character varying NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_899f602062d68278d4411fa351"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_adb31681fc86e7e980c0914f3f"`);
        await queryRunner.query(`DROP TABLE "project_cities"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_64bc2f6a11c065f18aed507f31"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5400e7b44258b1b9781a0873c2"`);
        await queryRunner.query(`DROP TABLE "project_materials"`);
        await queryRunner.query(`DROP TABLE "project"`);
    }

}
