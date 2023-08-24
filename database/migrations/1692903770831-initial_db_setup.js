const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class InitialDbSetup1692903770831 {
    name = 'InitialDbSetup1692903770831'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`carselona_staff\` CHANGE \`user_uuid\` \`carselona_staff_uuid\` varchar(36) NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`carselona_staff\` CHANGE \`carselona_staff_uuid\` \`user_uuid\` varchar(36) NOT NULL`);
    }
}
