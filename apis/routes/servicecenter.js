const { getEnvVars } = require("../../helpers/server-helper");
const { validationResultCheck, isUserType, resolveAccessToken } = require("../../middleware/middlewares");
const { servBookingStatus } = require("../../middleware/validation/form-validation");
const {  bookingList, updateBookingStatus } = require("../controllers/booking");
const router = require("express").Router();

const USER_TYPE_SERVICE_CENTER = getEnvVars().CONSTANTS.USER_TYPES.SERVICE_CENTER;

router.get("/booking/all", resolveAccessToken, isUserType(USER_TYPE_SERVICE_CENTER),bookingList);
router.put("/booking/:booking_id/:status", resolveAccessToken, isUserType(USER_TYPE_SERVICE_CENTER),servBookingStatus,validationResultCheck,updateBookingStatus);

module.exports = { parent: "/servicecenter", router };