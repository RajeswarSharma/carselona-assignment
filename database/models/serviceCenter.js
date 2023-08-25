const typeorm = require("typeorm");
const EntitySchema = typeorm.EntitySchema;

const serviceCenter = {
    name: "ServiceCenter",
    target: "servicecenter",
    schema: "server",
    columns: {
        servicecenter_uuid: {
            primary: true,
            type: "varchar",
            generated: "uuid",
            primaryKeyConstraintName: "PK_servicecenter_id"
        },
        service_center_name: {
            type: "varchar",
            length: 50,
            unique: true
        },
        longitude: {
            type: "decimal",
            precision: 11,
            scale: 8
        },
        latitude: {
            type: "decimal",
            precision: 11,
            scale: 8
        },
        addressLine_1: {
            type: "varchar",
            length: 100,
        },
        state: {
            type: "varchar",
            length: 100,
        },
        city: {
            type: "varchar",
            length: 20,
        },
        zipcode: {
            type: "varchar",
            length: 6,
        },
        email: {
            type: "varchar",
            length: 50,
            unique: true
        },
        phone: {
            type: "varchar",
            length: 15,
            unique: true
        },
        password: {
            type: "varchar",
            length: 256,
        },
        operate_from: { 
            type: "time" 
        },
        operate_till: { 
            type: "time" 
        },
        role:{
            type:"int",
            default: 1002
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