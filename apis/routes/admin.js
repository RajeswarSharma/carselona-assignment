const { getEnvVars } = require("../../helpers/server-helper");
const { validationResultCheck, isUserType, resolveAccessToken } = require("../../middleware/middlewares");
const { createServiceCenter } = require("../controllers/register");
const { bookingList, bookingMatrix } = require("../controllers/booking");
const { regServiceCenter } = require("../../middleware/validation/form-validation");
const router = require("express").Router();

const USER_TYPE_ADMIN = getEnvVars().CONSTANTS.USER_TYPES.ADMIN;
router.post("/service-center/add", resolveAccessToken, isUserType(USER_TYPE_ADMIN), regServiceCenter, validationResultCheck, createServiceCenter);
router.get("/booking/all", resolveAccessToken, isUserType(USER_TYPE_ADMIN), bookingList);
router.get("/booking/matrix", resolveAccessToken, isUserType(USER_TYPE_ADMIN), bookingMatrix);
module.exports = { parent: "/admin", router };