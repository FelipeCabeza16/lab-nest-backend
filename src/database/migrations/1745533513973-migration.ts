import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1745533513973 implements MigrationInterface {
    name = 'Migration1745533513973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "materials" DROP CONSTRAINT "FK_materials_unitId"`);
        await queryRunner.query(`ALTER TABLE "cities" DROP CONSTRAINT "FK_cities_stateId"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "department"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "project" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "project" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "project" ADD "cityId" uuid`);
        await queryRunner.query(`ALTER TABLE "materials" DROP CONSTRAINT "UQ_materials_code"`);
        await queryRunner.query(`ALTER TABLE "materials" ALTER COLUMN "unitId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "materials" ADD CONSTRAINT "FK_2803e68305f2ac75c2df92cba4a" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cities" ADD CONSTRAINT "FK_ded8a17cd090922d5bac8a2361f" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_802365a70caeeb191e02009fc06" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_802365a70caeeb191e02009fc06"`);
        await queryRunner.query(`ALTER TABLE "cities" DROP CONSTRAINT "FK_ded8a17cd090922d5bac8a2361f"`);
        await queryRunner.query(`ALTER TABLE "materials" DROP CONSTRAINT "FK_2803e68305f2ac75c2df92cba4a"`);
        await queryRunner.query(`ALTER TABLE "materials" ALTER COLUMN "unitId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "materials" ADD CONSTRAINT "UQ_materials_code" UNIQUE ("code")`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "cityId"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "project" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "project" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ADD "department" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cities" ADD CONSTRAINT "FK_cities_stateId" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "materials" ADD CONSTRAINT "FK_materials_unitId" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
