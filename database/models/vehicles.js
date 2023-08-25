const typeorm = require("typeorm");
const EntitySchema = typeorm.EntitySchema;

const serviceCenter = {
    name: "Vehicle",
    target: "vehicle",
    schema: "server",
    columns: {
        vehicle_uuid: {
            primary: true,
            type: "varchar",
            generated: "uuid",
            primaryKeyConstraintName: "PK_vehicle_id"
        },
        user_uuid: {
            type: "varchar"
        },
        vehicle_type: {
            type: "int"
        },
        vehicle_model: {
            type: "varchar",
            nullable: true
        },
        brand: {
            type: "varchar",
            nullable: true
        },
        number_plate: {
            type: "varchar"
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

const ServiceCenter = new EntitySchema(serviceCenter);

module.exports = ServiceCenter;