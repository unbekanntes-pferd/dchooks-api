import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateEvents1645902900561 implements MigrationInterface {
    name = 'UpdateEvents1645902900561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ADD "validHookType" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "validHmac256" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "actionsTriggered" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "actionsTriggered" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "validHmac256" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "validHookType"`);
    }

}
