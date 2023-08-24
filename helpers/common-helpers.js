const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getEnvVars } = require("./server-helper");
const { ServerError } = require("./error-helpers");
const JWT_PRIVATE = fs.readFileSync(path.join(__dirname, "sig.private.key"), { encoding: 'utf8' });
const JWT_PUBLIC = fs.readFileSync(path.join(__dirname, "sig.public.key"), { encoding: 'utf8' });

/**
 * removes the keys from dataObject, that are not present in comparision set
 * @param {Set} validSet 
 * @param {Object} dataObject 
 * @returns {null}
 */
const keepCommonKeysFromSet = (validSet, dataObject) => {
    for (const key of Object.keys(dataObject)) {
        if (!validSet.has(key)) {
            delete dataObject[key];
        }
    }
    return;
};

/**
 * 
 * @param {String} str 
 * @returns {String}
 */
const stringToHash = async (str) => {
    if (typeof str !== "string") throw new ServerError("Exprected a string",);
    const SALTROUND = 12;
    const salt = await bcrypt.genSalt(SALTROUND);
    const hashedString = bcrypt.hashSync(str, salt);
    return hashedString;
};

const checkHash = (str, hash) => {
    if (typeof str !== "string" || typeof hash !== "string") throw new Error("invalid params", getEnvVars().CONSTANTS.ERRORCODES.INVALID_PARAMS, false);
    const result = bcrypt.compareSync(str, hash);
    return result;
};

const createJWT = (payload, options = {}) => {
    const token = jwt.sign(payload, JWT_PRIVATE, {
        algorithm: getEnvVars().SERVER_CONF.JWT.JWT_SIG_ALGORITHM,
        issuer: getEnvVars().SERVER_CONF.JWT.JWT_ISSUER,
        expiresIn: "1d"
    });
    return token;
};

const verifyJWT = (token, options = {}) => {
    try {
        const decoded = jwt.verify(token, JWT_PUBLIC, {
            algorithms: getEnvVars().SERVER_CONF.JWT.JWT_SIG_ALGORITHM,
            issuer: getEnvVars().SERVER_CONF.JWT.JWT_ISSUER
        });
        return decoded;
    } catch (error) {
        throw new ServerError("Internal server Error", getEnvVars().CONSTANTS.HTTP_CODE.INTERNAL_SERVER_ERR, true);
    }
};

const randomStringGenerator = (size) => {
    return Math.random().toString(36).slice(-size);
};

module.exports = { keepCommonKeysFromSet, stringToHash, checkHash, createJWT, verifyJWT, randomStringGenerator };