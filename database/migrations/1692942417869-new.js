const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class New1692942417869 {
    name = 'New1692942417869'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`servicecenter\` CHANGE \`geom\` \`geom\` geometry NULL`);
        await queryRunner.query(`ALTER TABLE \`servicecenter\` CHANGE \`geom_utm\` \`geom_utm\` geometry NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`servicecenter\` CHANGE \`geom_utm\` \`geom_utm\` geometry NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`servicecenter\` CHANGE \`geom\` \`geom\` geometry NOT NULL`);
    }
}
