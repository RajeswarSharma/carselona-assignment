const { handleError } = require("../../helpers/error-helpers");
const { addUser } = require("../../services/user");

const createUser = async (req, res) => {
    try {
        const { firstname, lastname, email, phone, password } = req.body;
        await addUser({ firstname, lastname, email, phone, password });
        return res.json({ message: "user created" });
    } catch (error) {
        console.log(error);
        handleError(error);
    }
};

module.exports = { createUser };