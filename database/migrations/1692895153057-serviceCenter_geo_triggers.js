const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class serviceCenterGeoTriggers1692895153057 {

    async up(queryRunner) {
        await queryRunner.query(
            `   
            CREATE TRIGGER server.serviceCenter_set_srid_insert_trigger 
            BEFORE INSERT 
            ON server.servicecenter
            FOR EACH ROW
            BEGIN
            SET NEW.geom = ST_SetSRID(ST_MakePoint(NEW.longitude,NEW.latitude), 4326);
            END;
            `
        );
    }

    async down(queryRunner) {
        await queryRunner.query(`
        DROP TRIGGER IF EXISTS server.serviceCenter_set_srid_insert_trigger;
        `);
    }

};