import {MigrationInterface, QueryRunner} from "typeorm";

export class AddHookName1645867235515 implements MigrationInterface {
    name = 'AddHookName1645867235515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hook" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hook" DROP COLUMN "name"`);
    }

}
