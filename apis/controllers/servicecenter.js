const { handleError, ServerError } = require("../../helpers/error-helpers");
const { getEnvVars } = require("../../helpers/server-helper");
const { findServiceCenterByLongLat } = require("../../services/servicecenter");

const getServiceCenterByDistance = async (req, res) => {
    try {
        const { latitude, longitude, max_distance } = req.query;
        const serviceCenters = await findServiceCenterByLongLat(latitude, longitude, max_distance);
        if (serviceCenters.length === 0) {
            throw new ServerError("Not available at your location", getEnvVars().CONSTANTS.HTTP_CODE.NO_CONTENT,true);
        }
        return res.json({ result: serviceCenters });
    } catch (error) {
        console.log(error);
        handleError(error, res);
    }
};

module.exports = { getServiceCenterByDistance };