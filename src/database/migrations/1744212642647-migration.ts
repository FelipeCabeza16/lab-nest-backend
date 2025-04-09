import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1744212642647 implements MigrationInterface {
    name = 'Migration1744212642647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "unit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "symbol" character varying NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4252c4be609041e559f0c80f58a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "material" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, "minimumStock" integer NOT NULL, "currentStock" integer NOT NULL, "cost" numeric(10,2) NOT NULL, "supplier" character varying, "location" character varying, "category" character varying, "notes" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "unitId" uuid, CONSTRAINT "UQ_35179a8a2535c1bc2ca56992cbd" UNIQUE ("code"), CONSTRAINT "PK_0343d0d577f3effc2054cbaca7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "material" ADD CONSTRAINT "FK_c357cc6b79ec0b39dbff21ca014" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "material" DROP CONSTRAINT "FK_c357cc6b79ec0b39dbff21ca014"`);
        await queryRunner.query(`DROP TABLE "material"`);
        await queryRunner.query(`DROP TABLE "unit"`);
    }

}
