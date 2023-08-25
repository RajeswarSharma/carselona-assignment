const typeorm = require("typeorm");
const EntitySchema = typeorm.EntitySchema;

const carselonaStaff = {
    name: "Carselona_staff",
    target: "carselona_staff",
    schema: "server",
    columns: {
        carselona_staff_uuid: {
            primary: true,
            type: "varchar",
            generated: "uuid",
            primaryKeyConstraintName: "PK_carselona_staff_id"
        },
        firstname: {
            type: "varchar",
            length: 30,
        },
        lastname: {
            type: "varchar",
            length: 20,
            nullable: true
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
        role:{
            type:"int",
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

const CarselonaStaff = new EntitySchema(carselonaStaff);

module.exports = CarselonaStaff;