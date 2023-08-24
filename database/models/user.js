const typeorm = require("typeorm");
const EntitySchema = typeorm.EntitySchema;

const user = {
    name: "User",
    target: "user",
    schema: "server",
    columns: {
        user_uuid: {
            primary: true,
            type: "varchar",
            generated: "uuid",
            primaryKeyConstraintName: "PK_user_id"
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

const User = new EntitySchema(user);

module.exports = User;