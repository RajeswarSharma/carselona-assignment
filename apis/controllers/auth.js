const { dbConnections } = require("../../database/connection");
const { checkHash, createJWT } = require("../../helpers/common-helpers");
const { handleError } = require("../../helpers/error-helpers");
const { getEnvVars } = require("../../helpers/server-helper");
const { getStaffByfilters } = require("../../services/servicecenter");
const { getUserByfilters } = require("../../services/user");

const getLoginContorller = (repo) => {
    const fetchUserMethods = {
        "user": getUserByfilters,
        "staff":getStaffByfilters
    };
    return async (req, res) => {
        try {
            const { email, password } = req.body;
            const filter = { email };
            const userFromDB = await fetchUserMethods[repo](filter, { show_password: true });
            if (!userFromDB) {
                return res.status(getEnvVars().CONSTANTS.HTTP_CODE.UNAUTHORIZED).json({
                    message: "Incorrect email or password"
                });
            }
            const isCorrectPassword = checkHash(password, userFromDB.password);
            if (!isCorrectPassword) {
                return res.status(getEnvVars().CONSTANTS.HTTP_CODE.UNAUTHORIZED).json({
                    message: "Incorrect email or password"
                });
            }
            delete userFromDB.password;
            const jwt = createJWT({ user: userFromDB });
            return res.json({ access_token: jwt });
        } catch (error) {
            console.log(error);
            handleError(error, res);
        }
    };
};

module.exports = { getLoginContorller };