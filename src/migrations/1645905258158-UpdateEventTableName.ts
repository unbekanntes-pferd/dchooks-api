import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateEventTableName1645905258158 implements MigrationInterface {
    name = 'UpdateEventTableName1645905258158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hook_event" ("id" SERIAL NOT NULL, "eventReceived" TIMESTAMP NOT NULL DEFAULT now(), "eventUpdated" TIMESTAMP NOT NULL DEFAULT now(), "hookId" character varying NOT NULL, "hookType" character varying NOT NULL, "eventType" character varying NOT NULL, "actionTypeNames" character varying array NOT NULL, "validHookType" boolean NOT NULL DEFAULT false, "validHmac256" boolean NOT NULL DEFAULT false, "actionsTriggered" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_7374d299c678ee42acd2e23614c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "hook_event"`);
    }

}
