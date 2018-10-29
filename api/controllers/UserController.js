const User = require('../models').User;
const throwError = require('../helper/RequestHelper').throwError;

const getByEmail = async (email) => {
    try {
        const user = await User.findOne({ email: email })
        return user
    } catch (error) {
        throw error
    }
}

const addUser = async (firstname, lastname, pseudo, email, hash, organization) => {
    try {
        const user = await User.find({ $or: [{ username: pseudo }, { email: email }]})
        console.log(user)
        if(user.length > 0){
            if(user[0].email === email){
                throwError(400, "Email already taken")
            } else {
                throwError(400, "Pseudo already taken")
            }
        }
        const newUser = await User.create({fullName: `${firstname} ${lastname}`, initials: `${firstname.slice(1)}${lastname.slice(1)}`, username: pseudo, email, hash, organization})
        return newUser
    } catch(error) {
        throw error
    }
}

module.exports = {
    getByEmail,
    addUser
}