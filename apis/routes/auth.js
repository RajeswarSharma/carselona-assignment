const { validationResultCheck } = require("../../middleware/middlewares");
const { getLoginContorller } = require("../controllers/auth");
const router = require("express").Router();

router.post("/login/user", validationResultCheck, getLoginContorller("user"));
router.post("/login/staff", validationResultCheck, getLoginContorller("staff"));
module.exports = { parent: "/auth", router };