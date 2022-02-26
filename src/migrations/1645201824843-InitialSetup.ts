import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSetup1645201824843 implements MigrationInterface {
    name = 'InitialSetup1645201824843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hook" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "eventTypeNames" character varying array NOT NULL, "actionTypeNames" character varying array NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "creatorId" integer NOT NULL, CONSTRAINT "PK_4fae52db3090a56452a9c93e0ed" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "hook"`);
    }

}
