const { handleError } = require("../../helpers/error-helpers");
const { vehicleList } = require("../../services/user");

const getVehicleList = async (req, res) => {
    try {
        const user_uuid = req.headers.access_token.user_uuid;
        const vehicles = await vehicleList(user_uuid);
        return res.json({ result: vehicles });
    } catch (error) {
        console.log(error);
        handleError(error, res);
    }
};

module.exports = { getVehicleList };