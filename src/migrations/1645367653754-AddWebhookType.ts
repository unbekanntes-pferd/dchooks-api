import {MigrationInterface, QueryRunner} from "typeorm";

export class AddWebhookType1645367653754 implements MigrationInterface {
    name = 'AddWebhookType1645367653754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hook" ADD "hookType" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hook" DROP COLUMN "hookType"`);
    }

}
