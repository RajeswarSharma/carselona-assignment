const { handleError } = require("../../helpers/error-helpers");
const { addServiceCenter } = require("../../services/servicecenter");
const { addUser, addVehicle } = require("../../services/user");

const createUser = async (req, res) => {
    try {
        const { firstname, lastname, email, phone, password } = req.body;
        await addUser({ firstname, lastname, email, phone, password });
        return res.json({ message: "user created" });
    } catch (error) {
        console.log(error);
        handleError(error, res);
    }
};

const createServiceCenter = async (req, res) => {
    try {
        const data = req.body;
        const id = await addServiceCenter(data);
        return res.json({ message: "created", id });
    } catch (error) {
        console.log(error);
        handleError(error, res);
    }
};

const createVehicle = async (req, res) => {
    try {
        const { vehicle_type, vehicle_model, brand, number_plate } = req.body;
        const user_uuid = req.headers.access_token.user.user_uuid;
        const vehicle = await addVehicle({ vehicle_type, vehicle_model, brand, number_plate, user_uuid });
        return res.json({ message: "created", id: vehicle.identifiers[0].vehicle_uuid });
    } catch (error) {
        console.log(error);
        handleError(error, res);
    }
};
module.exports = { createUser, createServiceCenter, createVehicle };