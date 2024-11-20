"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Initial1731679030449 = void 0;
class Initial1731679030449 {
    constructor() {
        this.name = 'Initial1731679030449';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "category_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_1a38b9007ed8afab85026703a53" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "imgUrl" character varying NOT NULL DEFAULT 'https://bit.ly/fgpImg1', "categoryId" uuid, CONSTRAINT "PK_6e8f75045ddcd1c389c765c896e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_detail_entity" ("id" SERIAL NOT NULL, "totalPrice" numeric(10,2) NOT NULL, CONSTRAINT "PK_84fd149ad33f9a5c1e368d0ff7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP DEFAULT now(), "userId" uuid, "orderDetailsId" integer, CONSTRAINT "REL_31c634dc296fbdd97533ca8ec4" UNIQUE ("orderDetailsId"), CONSTRAINT "PK_428b558237e70f2cd8462e1bea1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(20) NOT NULL, "phone" integer, "country" character varying(50), "address" text, "city" character varying(50) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_detail_entity_products_product_entity" ("orderDetailEntityId" integer NOT NULL, "productEntityId" uuid NOT NULL, CONSTRAINT "PK_b208089fa53884dfa9a6ca9350c" PRIMARY KEY ("orderDetailEntityId", "productEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_21a7be39dbb7547599f1e6c961" ON "order_detail_entity_products_product_entity" ("orderDetailEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dc3e5bae00647ed4fa614bc1c7" ON "order_detail_entity_products_product_entity" ("productEntityId") `);
        await queryRunner.query(`ALTER TABLE "product_entity" ADD CONSTRAINT "FK_641188cadea80dfe98d4c769ebf" FOREIGN KEY ("categoryId") REFERENCES "category_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD CONSTRAINT "FK_c8ab590f1e10afcf1637e71a71e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD CONSTRAINT "FK_31c634dc296fbdd97533ca8ec46" FOREIGN KEY ("orderDetailsId") REFERENCES "order_detail_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_detail_entity_products_product_entity" ADD CONSTRAINT "FK_21a7be39dbb7547599f1e6c961b" FOREIGN KEY ("orderDetailEntityId") REFERENCES "order_detail_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_detail_entity_products_product_entity" ADD CONSTRAINT "FK_dc3e5bae00647ed4fa614bc1c71" FOREIGN KEY ("productEntityId") REFERENCES "product_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "order_detail_entity_products_product_entity" DROP CONSTRAINT "FK_dc3e5bae00647ed4fa614bc1c71"`);
        await queryRunner.query(`ALTER TABLE "order_detail_entity_products_product_entity" DROP CONSTRAINT "FK_21a7be39dbb7547599f1e6c961b"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP CONSTRAINT "FK_31c634dc296fbdd97533ca8ec46"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP CONSTRAINT "FK_c8ab590f1e10afcf1637e71a71e"`);
        await queryRunner.query(`ALTER TABLE "product_entity" DROP CONSTRAINT "FK_641188cadea80dfe98d4c769ebf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dc3e5bae00647ed4fa614bc1c7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_21a7be39dbb7547599f1e6c961"`);
        await queryRunner.query(`DROP TABLE "order_detail_entity_products_product_entity"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "order_entity"`);
        await queryRunner.query(`DROP TABLE "order_detail_entity"`);
        await queryRunner.query(`DROP TABLE "product_entity"`);
        await queryRunner.query(`DROP TABLE "category_entity"`);
    }
}
exports.Initial1731679030449 = Initial1731679030449;
//# sourceMappingURL=1731679030449-initial.js.map