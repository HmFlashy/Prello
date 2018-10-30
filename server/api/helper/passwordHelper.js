const bcrypt = require("bcrypt");
const saltRounds = 10;

const passwordHelper = async(password) => {
    try {
        const hash = await bcrypt.hash(password, saltRounds)
        return hash
    } catch (error) {
        console.log(error);
        throw error
    }
};

module.exports = {
    passwordHelper
};
