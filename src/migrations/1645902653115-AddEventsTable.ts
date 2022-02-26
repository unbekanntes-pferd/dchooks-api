import {MigrationInterface, QueryRunner} from "typeorm";

export class AddEventsTable1645902653115 implements MigrationInterface {
    name = 'AddEventsTable1645902653115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "eventReceived" TIMESTAMP NOT NULL DEFAULT now(), "eventUpdated" TIMESTAMP NOT NULL DEFAULT now(), "hookId" character varying NOT NULL, "hookType" character varying NOT NULL, "eventType" character varying NOT NULL, "actionTypeNames" character varying array NOT NULL, "validHmac256" boolean NOT NULL, "actionsTriggered" boolean NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "event"`);
    }

}
