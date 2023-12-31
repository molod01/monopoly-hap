import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTurnHistory1704025499145 implements MigrationInterface {
    name = 'AddTurnHistory1704025499145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "turn_history" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "player_id" integer, "turn_id" integer, CONSTRAINT "REL_ff86038c4d2f67ea97883dd2d9" UNIQUE ("turn_id"), CONSTRAINT "PK_8920836e9eb7c89ce78effa7f7a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "turn_history" ADD CONSTRAINT "FK_35809abece10981ae91df369781" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "turn_history" ADD CONSTRAINT "FK_ff86038c4d2f67ea97883dd2d9c" FOREIGN KEY ("turn_id") REFERENCES "turn"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "turn_history" DROP CONSTRAINT "FK_ff86038c4d2f67ea97883dd2d9c"`);
        await queryRunner.query(`ALTER TABLE "turn_history" DROP CONSTRAINT "FK_35809abece10981ae91df369781"`);
        await queryRunner.query(`DROP TABLE "turn_history"`);
    }

}
