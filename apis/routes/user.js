/* The code is defining a router for handling various routes related to user operations. */
const { getEnvVars } = require("../../helpers/server-helper");
const { validationResultCheck, resolveAccessToken, isUserType } = require("../../middleware/middlewares");
const { regUser, regVehicle, addBooking, cancleBooking } = require("../../middleware/validation/form-validation");
const { createBooking, bookingList, updateBookingStatus } = require("../controllers/booking");
const { createUser, createVehicle } = require("../controllers/register");
const router = require("express").Router();
const USER_TYPE_USER = getEnvVars().CONSTANTS.USER_TYPES.USER;

router.post("/create", regUser, validationResultCheck, createUser);
router.post("/vehicle/add", resolveAccessToken, isUserType(USER_TYPE_USER), regVehicle, validationResultCheck, createVehicle);
router.post("/booking/add", resolveAccessToken, isUserType(USER_TYPE_USER),addBooking, validationResultCheck, createBooking);
router.get("/booking/all", resolveAccessToken, isUserType(USER_TYPE_USER), validationResultCheck, bookingList);
router.put("/booking/:booking_id/cancel", resolveAccessToken, isUserType(USER_TYPE_USER),cancleBooking,validationResultCheck, updateBookingStatus);


module.exports = { parent: "/user", router };