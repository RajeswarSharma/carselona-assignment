const { getEnvVars } = require("./server-helper");

class ServerError extends Error {
    constructor(message, code, isHttpError) {
        if (!code) throw new Error("Must have an error code");
        super(message);
        this.code = code;
        this.isHttpError = isHttpError || false;
    }
}

const handleError = (error, res) => {
    console.error(error);
    if (res) {
        if (error.isHttpError === true) {
            return res.status(error.code).json({ message: error.message });
        }
        return res.status(getEnvVars().CONSTANTS.HTTP_CODE.INTERNAL_SERVER_ERR).json({ message: "Internal server error" });
    }
    else throw error;
};

module.exports = { ServerError, handleError };