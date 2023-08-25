const typeorm = require("typeorm");
const EntitySchema = typeorm.EntitySchema;

const serviceCenter = {
    name: "Booking",
    target: "booking",
    schema: "server",
    columns: {
        booking_uuid: {
            primary: true,
            type: "varchar",
            generated: "uuid",
            primaryKeyConstraintName: "PK_booking_id"
        },
        user_uuid: {
            type: "varchar"
        },
        servicecenter_uuid: {
            type: "varchar"
        },
        vehicle_uuid: {
            type: "varchar"
        },
        service_type_id: {
            type: "int"
        },
        service_status: {
            type: "int",
            default: 2001
        },
        service_date: {
            type: "datetime"
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