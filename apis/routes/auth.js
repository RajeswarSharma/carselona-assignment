const { validationResultCheck } = require("../../middleware/middlewares");
const { login } = require("../../middleware/validation/form-validation");
const { getLoginContorller } = require("../controllers/auth");
const router = require("express").Router();

router.post("/login/user", login,validationResultCheck, getLoginContorller("user"));
router.post("/login/staff", login,validationResultCheck, getLoginContorller("staff"));
router.post("/login/servicecenter", login, validationResultCheck, getLoginContorller("servicecenter"));
module.exports = { parent: "/auth", router };