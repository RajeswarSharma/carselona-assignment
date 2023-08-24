const { validationResult } = require("express-validator");
const { ServerError, handleError } = require("../helpers/error-helpers");
const { getEnvVars } = require("../helpers/server-helper");

const validationResultCheck = (req, res, next) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) {
        return res.status(getEnvVars().CONSTANTS.HTTP_CODE.BAD_REQUEST).json({ result: false, errors });
    }
    return next();
};


const isUserType = (userTypes) => {
    userTypes = Array.isArray(userTypes) ? new Set(userTypes) : new Set([userTypes]);
    return (req, res, next) => {
        try {
            const { user_type } = req.header.access_token;
            if (userTypes.has(user_type)) {
                return next();
            }
            throw new ServerError("Permission denied", getEnvVars().CONSTANTS.HTTP_CODE.FORBIDEN, true);
        } catch (error) {
            handleError(error, res);
        }
    };
};

module.exports = { validationResultCheck, isUserType };