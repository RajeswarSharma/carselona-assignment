const { getEnvVars } = require("../../helpers/server-helper");
const { validationResultCheck, resolveAccessToken, isUserType } = require("../../middleware/middlewares");
const { findService } = require("../../middleware/validation/form-validation");
const { getServiceCenterByDistance } = require("../controllers/servicecenter");
const router = require("express").Router();

const USER_TYPE_ADMIN = getEnvVars().CONSTANTS.USER_TYPES.ADMIN;
const USER_TYPE_USER = getEnvVars().CONSTANTS.USER_TYPES.USER;

router.get("/service-center", resolveAccessToken, isUserType([USER_TYPE_ADMIN, USER_TYPE_USER]), findService,validationResultCheck, getServiceCenterByDistance);
module.exports = { parent: "/find", router };