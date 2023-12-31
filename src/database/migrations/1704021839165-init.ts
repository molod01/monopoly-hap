import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1704021839165 implements MigrationInterface {
    name = 'Init1704021839165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."monopoly_type_enum" AS ENUM('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10')`);
        await queryRunner.query(`CREATE TABLE "monopoly" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_full" boolean NOT NULL, "type" "public"."monopoly_type_enum", CONSTRAINT "PK_0648581681a3135ccf664dd9775" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."company_monopoly_type_enum" AS ENUM('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10')`);
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "color" character varying NOT NULL, "monopoly_type" "public"."company_monopoly_type_enum", "owner_id" integer, "monopoly_id" integer, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."tile_type_enum" AS ENUM('0', '1', '2', '3', '4', '5', '6', '7', '8', '9')`);
        await queryRunner.query(`CREATE TABLE "tile" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "order_number" integer NOT NULL, "type" "public"."tile_type_enum", "is_laid" boolean NOT NULL DEFAULT true, "company_id" integer, CONSTRAINT "REL_4f78c21d52c954a8a27d2582c7" UNIQUE ("company_id"), CONSTRAINT "PK_b5bf4fc6593cc524004043a6f8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "player" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "username" text NOT NULL, "color" text NOT NULL, "balance" integer NOT NULL DEFAULT '15000', "is_active" boolean NOT NULL DEFAULT true, "tile_id" integer, CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "turn" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "step_value" integer NOT NULL, "is_double" boolean NOT NULL DEFAULT false, "player_id" integer, "from_id" integer, "to_id" integer, CONSTRAINT "PK_a9046ae56d7e5b2b1f7413b5e6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_0c6ea8a32565efcb512e572d61d" FOREIGN KEY ("owner_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_103e0aa3263d106e920756445a2" FOREIGN KEY ("monopoly_id") REFERENCES "monopoly"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tile" ADD CONSTRAINT "FK_4f78c21d52c954a8a27d2582c76" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player" ADD CONSTRAINT "FK_b0ec0d28bb2819b0a98a4cded56" FOREIGN KEY ("tile_id") REFERENCES "tile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "turn" ADD CONSTRAINT "FK_0f7469082faef4f4edecd411a18" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "turn" ADD CONSTRAINT "FK_52a371b8cfdae7c4a72da98a319" FOREIGN KEY ("from_id") REFERENCES "tile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "turn" ADD CONSTRAINT "FK_2ad283b93f59fab96ed3519eded" FOREIGN KEY ("to_id") REFERENCES "tile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "turn" DROP CONSTRAINT "FK_2ad283b93f59fab96ed3519eded"`);
        await queryRunner.query(`ALTER TABLE "turn" DROP CONSTRAINT "FK_52a371b8cfdae7c4a72da98a319"`);
        await queryRunner.query(`ALTER TABLE "turn" DROP CONSTRAINT "FK_0f7469082faef4f4edecd411a18"`);
        await queryRunner.query(`ALTER TABLE "player" DROP CONSTRAINT "FK_b0ec0d28bb2819b0a98a4cded56"`);
        await queryRunner.query(`ALTER TABLE "tile" DROP CONSTRAINT "FK_4f78c21d52c954a8a27d2582c76"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_103e0aa3263d106e920756445a2"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_0c6ea8a32565efcb512e572d61d"`);
        await queryRunner.query(`DROP TABLE "turn"`);
        await queryRunner.query(`DROP TABLE "player"`);
        await queryRunner.query(`DROP TABLE "tile"`);
        await queryRunner.query(`DROP TYPE "public"."tile_type_enum"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TYPE "public"."company_monopoly_type_enum"`);
        await queryRunner.query(`DROP TABLE "monopoly"`);
        await queryRunner.query(`DROP TYPE "public"."monopoly_type_enum"`);
    }

}
