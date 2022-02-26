import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSecretNullable1645209737681 implements MigrationInterface {
    name = 'AddSecretNullable1645209737681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hook" ALTER COLUMN "secret" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hook" ALTER COLUMN "secret" SET NOT NULL`);
    }

}
