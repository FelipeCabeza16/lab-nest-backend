import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1744217741816 implements MigrationInterface {
    name = 'Migration1744217741816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "city" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "stateId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "state" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_549ffd046ebab1336c3a8030a12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "city" ADD CONSTRAINT "FK_e99de556ee56afe72154f3ed04a" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "city" DROP CONSTRAINT "FK_e99de556ee56afe72154f3ed04a"`);
        await queryRunner.query(`DROP TABLE "state"`);
        await queryRunner.query(`DROP TABLE "city"`);
    }

}
