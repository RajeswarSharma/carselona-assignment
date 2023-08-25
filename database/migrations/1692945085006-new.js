const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class New1692945085006 {
    name = 'New1692945085006'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`servicecenter\` DROP COLUMN \`geom\``);
        await queryRunner.query(`ALTER TABLE \`servicecenter\` DROP COLUMN \`geom_utm\``);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`servicecenter\` ADD \`geom_utm\` geometry NULL`);
        await queryRunner.query(`ALTER TABLE \`servicecenter\` ADD \`geom\` geometry NULL`);
    }
}
