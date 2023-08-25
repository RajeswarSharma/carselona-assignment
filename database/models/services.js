const typeorm = require("typeorm");
const EntitySchema = typeorm.EntitySchema;

const service = {
    name: "Service",
    target: "service",
    schema: "server",
    columns: {
        service_uuid: {
            primary: true,
            type: "varchar",
            generated: "uuid",
            primaryKeyConstraintName: "PK_service_id"
        },
        service_center_uuid: {
            type: "varchar",
        },
        service_id: {
            type: "int"
        },
        created_at: {
            type: "datetime",
            createDate: true,
        },
        updated_at: {
            type: "datetime",
            updateDate: true
        }
    }
};

const Service = new EntitySchema(service);

module.exports = Service;