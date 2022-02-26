import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSecret1645202310816 implements MigrationInterface {
    name = 'AddSecret1645202310816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hook" ADD "secret" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hook" DROP COLUMN "secret"`);
    }

}
