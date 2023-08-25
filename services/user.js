const { dbConnections } = require("../database/connection");
const { stringToHash } = require("../helpers/common-helpers");

const addUser = async (userData) => {
    const { firstname, lastname, email, phone, password } = userData;
    const hashedPassword = await stringToHash(password);
    const newUser = await dbConnections().repos["user"].insert({ firstname, lastname, email, phone, password: hashedPassword });
    return newUser;
};

const addVehicle = async (vehicleData) => {
    const { user_uuid, vehicle_type, vehicle_model, brand, number_plate } = vehicleData;
    const newVahicle = await dbConnections().repos["vehicle"].insert({ user_uuid, vehicle_type, vehicle_model, brand, number_plate });
    return newVahicle;
};

const getUserByfilters = async (filtersFromUser, options = {}) => {
    const validUserFilters = ["user_uuid", "email", "phone"];
    const filterObect = {};
    for (const filterKey of validUserFilters) {
        if (filtersFromUser.hasOwnProperty(filterKey))
            filterObect[filterKey] = filtersFromUser[filterKey];
    }
    const projection = { user_uuid: true, firstname: true, lastname: true, email: true, phone: true, created_at: true, updated_at: true, role: true };
    if (options.show_password === true) {
        projection.password = true;
    }
    if (options.get_many === true) {
        return await dbConnections().repos["user"].find({
            where: filterObect,
            select: projection
        });
    }
    return await dbConnections().repos["user"].findOne({
        where: filterObect,
        select: projection
    });

};

const vehicleList = async (user_uuid) => {
    const vechicleList = await dbConnections().repos["vehicle"].find({
        where: { user_uuid },
        select: {
            vehicle_uuid: true,
            vehicle_type: true,
            vehicle_model: true,
            brand: true,
            number_plate: true
        }
    });
    return vechicleList;
};
module.exports = { addUser, getUserByfilters, addVehicle, vehicleList };