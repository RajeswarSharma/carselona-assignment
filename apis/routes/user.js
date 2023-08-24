const { validationResultCheck } = require("../../middleware/middlewares");
const { createUser } = require("../controllers/register");
const router = require("express").Router();

router.post("/create", validationResultCheck, createUser);
module.exports = { parent: "/user", router };