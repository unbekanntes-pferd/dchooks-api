import {MigrationInterface, QueryRunner} from "typeorm";

export class AddWebhookId1645232637433 implements MigrationInterface {
    name = 'AddWebhookId1645232637433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hook" ADD "dracoonWebhookId" integer`);
        await queryRunner.query(`ALTER TABLE "hook" ADD CONSTRAINT "UQ_ead0c907f79738cbf6e31ef9e11" UNIQUE ("dracoonWebhookId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hook" DROP CONSTRAINT "UQ_ead0c907f79738cbf6e31ef9e11"`);
        await queryRunner.query(`ALTER TABLE "hook" DROP COLUMN "dracoonWebhookId"`);
    }

}
