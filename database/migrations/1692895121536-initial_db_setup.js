const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class InitialDbSetup1692895121536 {
    name = 'InitialDbSetup1692895121536'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`user\` (\`user_uuid\` varchar(36) NOT NULL, \`firstname\` varchar(30) NOT NULL, \`lastname\` varchar(20) NULL, \`email\` varchar(50) NOT NULL, \`phone\` varchar(15) NOT NULL, \`password\` varchar(256) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_8e1f623798118e629b46a9e629\` (\`phone\`), PRIMARY KEY (\`user_uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`servicecenter\` (\`servicecenter_uuid\` varchar(36) NOT NULL, \`service_center_name\` varchar(50) NOT NULL, \`longitude\` decimal(11,8) NOT NULL, \`latitude\` decimal(11,8) NOT NULL, \`geom\` geometry NOT NULL, \`geom_utm\` geometry NOT NULL, \`addressLine_1\` varchar(100) NOT NULL, \`state\` varchar(100) NOT NULL, \`city\` varchar(20) NOT NULL, \`zipcode\` varchar(6) NOT NULL, \`email\` varchar(50) NOT NULL, \`phone\` varchar(15) NOT NULL, \`password\` varchar(256) NOT NULL, \`operate_from\` time NOT NULL, \`operate_till\` time NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_723109f7c95bc2091b4f81fa25\` (\`service_center_name\`), UNIQUE INDEX \`IDX_97082dbbf379b0660b87394b3a\` (\`email\`), UNIQUE INDEX \`IDX_ce360139a7d244ab5aa60fcc2e\` (\`phone\`), PRIMARY KEY (\`servicecenter_uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`service\` (\`service_uuid\` varchar(36) NOT NULL, \`service_center_uuid\` varchar(255) NOT NULL, \`service_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`service_uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`carselona_staff\` (\`user_uuid\` varchar(36) NOT NULL, \`firstname\` varchar(30) NOT NULL, \`lastname\` varchar(20) NULL, \`email\` varchar(50) NOT NULL, \`phone\` varchar(15) NOT NULL, \`password\` varchar(256) NOT NULL, \`role\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_20bb83ab0e81f090eaf3a46daa\` (\`email\`), UNIQUE INDEX \`IDX_db678d4942341b03df5e644861\` (\`phone\`), PRIMARY KEY (\`user_uuid\`)) ENGINE=InnoDB`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX \`IDX_db678d4942341b03df5e644861\` ON \`carselona_staff\``);
        await queryRunner.query(`DROP INDEX \`IDX_20bb83ab0e81f090eaf3a46daa\` ON \`carselona_staff\``);
        await queryRunner.query(`DROP TABLE \`carselona_staff\``);
        await queryRunner.query(`DROP TABLE \`service\``);
        await queryRunner.query(`DROP INDEX \`IDX_ce360139a7d244ab5aa60fcc2e\` ON \`servicecenter\``);
        await queryRunner.query(`DROP INDEX \`IDX_97082dbbf379b0660b87394b3a\` ON \`servicecenter\``);
        await queryRunner.query(`DROP INDEX \`IDX_723109f7c95bc2091b4f81fa25\` ON \`servicecenter\``);
        await queryRunner.query(`DROP TABLE \`servicecenter\``);
        await queryRunner.query(`DROP INDEX \`IDX_8e1f623798118e629b46a9e629\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }
}
