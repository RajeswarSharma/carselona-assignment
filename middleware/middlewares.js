const { validationResult } = require("express-validator");
const { ServerError, handleError } = require("../helpers/error-helpers");
const { getEnvVars } = require("../helpers/server-helper");
const { verifyJWT } = require("../helpers/common-helpers");

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
            const { role } = req.headers.access_token.user;
            if (userTypes.has(role)) {
                return next();
            }
            throw new ServerError("Permission denied", getEnvVars().CONSTANTS.HTTP_CODE.FORBIDDEN, true);
        } catch (error) {
            handleError(error, res);
        }
    };
};

const resolveAccessToken = (req, res, next) => {
    try {
        const { access_token } = req.headers;
        if (!access_token) {
            throw new ServerError("Access token not found", getEnvVars().CONSTANTS.HTTP_CODE.FORBIDDEN, true);
        }
        const verifiedAccessToken = verifyJWT(access_token);
        req.headers.access_token = verifiedAccessToken;
        return next();
    } catch (error) {
        console.log(error);
        handleError(error, res);
    }
};
module.exports = { validationResultCheck, isUserType, resolveAccessToken };