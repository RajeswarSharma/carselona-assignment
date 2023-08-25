const { handleError, ServerError } = require("../../helpers/error-helpers");
const { getEnvVars } = require("../../helpers/server-helper");
const { addBooking, getBookingByFilter, changeBookingStatus, getBookingMatrix } = require("../../services/booking");


const createBooking = async (req, res) => {
    try {
        const user_uuid = req.headers.access_token.user.user_uuid;
        const { servicecenter_uuid, vehicle_uuid, service_type_id, service_date } = req.body;
        const newBooking = await addBooking({ user_uuid, servicecenter_uuid, vehicle_uuid, service_type_id, service_date });
        return res.json({ message: "created", id: newBooking.identifiers[0].booking_uuid });
    } catch (error) {
        console.log(error);
        handleError(error, res);
    }
};

const bookingList = async (req, res) => {
    try {
        const user_type = req.headers.access_token.user.role;
        const filters = {};
        if (user_type === getEnvVars().CONSTANTS.USER_TYPES.USER) {
            filters.user_uuid = req.headers.access_token.user.user_uuid;
        }
        else if (user_type === getEnvVars().CONSTANTS.USER_TYPES.SERVICE_CENTER) {
            filters.servicecenter_uuid = req.headers.access_token.user.servicecenter_uuid;
        }
        else if (user_type !== getEnvVars().CONSTANTS.USER_TYPES.ADMIN) {
            throw new ServerError("Unauthorized", getEnvVars().CONSTANTS.HTTP_CODE.UNAUTHORIZED, true);
        }
        const bookings = await getBookingByFilter(filters);
        return res.json({ result: bookings });
    } catch (error) {
        console.log(error);
        handleError(error, res);
    }
};

const updateBookingStatus = async (req, res) => {
    try {
        const role = req.headers.access_token.user.role;
        const filter = {};
        const bookingId = req.params.booking_id;
        let status = req.params.status;
        if (role === getEnvVars().CONSTANTS.USER_TYPES.USER) {
            filter.booking_uuid = bookingId;
            filter.user_uuid = req.headers.access_token.user.user_uuid;
            status = 2003;
        }
        else if (role === getEnvVars().CONSTANTS.USER_TYPES.SERVICE_CENTER) {
            filter.booking_uuid = bookingId;
            filter.servicecenter_uuid = req.headers.access_token.user.servicecenter_uuid;
        }
        else {
            throw new ServerError("Forbidden", getEnvVars().CONSTANTS.HTTP_CODE.FORBIDDEN, true);
        }
        await changeBookingStatus(filter, status);
        return res.json({ message: `new status: ${status}`, booking_id: bookingId });
    } catch (error) {
        console.log(error);
        handleError(error, res);
    }
};

const bookingMatrix = async (req, res) => {
    try {
        matrixData = await getBookingMatrix();
        return res.json({ result: matrixData });
    } catch (error) {
        console.log(error);
        handleError(error, res);
    }
};
module.exports = { createBooking, bookingList, updateBookingStatus, bookingMatrix };