const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class N1692957105810 {
    name = 'N1692957105810'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`servicecenter\` ADD \`role\` int NOT NULL DEFAULT '1002'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`servicecenter\` DROP COLUMN \`role\``);
    }
}
