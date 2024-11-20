import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Initial1736442418482 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
