import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateEventTypeName1645866528173 implements MigrationInterface {
    name = 'UpdateEventTypeName1645866528173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hook" RENAME COLUMN "eventTypeNames" TO "eventTypeName"`);
        await queryRunner.query(`ALTER TABLE "hook" DROP COLUMN "eventTypeName"`);
        await queryRunner.query(`ALTER TABLE "hook" ADD "eventTypeName" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hook" DROP COLUMN "eventTypeName"`);
        await queryRunner.query(`ALTER TABLE "hook" ADD "eventTypeName" character varying array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hook" RENAME COLUMN "eventTypeName" TO "eventTypeNames"`);
    }

}
