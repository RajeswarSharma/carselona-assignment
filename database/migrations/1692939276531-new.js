const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class New1692939276531 {
    name = 'New1692939276531'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` int NOT NULL DEFAULT '1003'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    }
}
