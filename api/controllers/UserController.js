const User = require('../models').User;

const getByEmail = async (email) => {
    try {
        const user = await User.findOne({ email: email })
        return user
    } catch (error) {
        throw error
    }
}

module.exports = {
    getByEmail
}