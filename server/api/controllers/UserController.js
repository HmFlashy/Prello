const User = require("../models/index").User;
const throwError = require("../helper/RequestHelper").throwError;
const passwordHelper = require("../helper/passwordHelper");

const getByEmail = async (email) => {
    try {
        const user = await User.findOne({email: email})
        return user
    } catch (error) {
        throw error
    }
}

const addUser = async (firstname, lastname, username, email, password, organization) => {
    try {
        const existingUsers = await User.find({$or: [{username: this.username}, {email: this.email}]});
        if (existingUsers.length > 0) {
            if (existingUsers[0].email === this.email) {
                throwError(400, "Email already taken")
            } else {
                throwError(400, "Pseudo already taken")
            }
        }
        const hash = await passwordHelper.passwordHelper(password)
        const user = new User({
            fullName: `${firstname} ${lastname}`,
            initials: `${firstname.slice(1)}${lastname.slice(1)}`,
            username,
            email,
            hash: hash,
            organization
        });
        return await user.save()
    } catch (error) {
        throw error
    }
}

const getUserByUsername = async (username) => {
    try {
        return await User.findOne({username: username})
    } catch (error) {
        throw error
    }
}

module.exports = {
    getByEmail,
    addUser
}