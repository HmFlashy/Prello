const User = require("../models/index").User;
const Board = require("../models/index").Board;
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

const getById = async (userId) => {
    try {
        const user = await User.findById(userId)
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

const unstarBoard = async (userId, boardId) => {
    try {
        const user = await User.findByIdAndUpdate(userId, {
            $pull: {starred: boardId}
        });
        if(!user) {
            throwError(404, `The user ${userId} was not found`)
        }
        const board = await Board.findOneAndUpdate({_id: boardId}, {
            $pull: {starred: user._id}
        })
        if(!board) {
            throwError(404, `The board ${boardId} was not found`)
        }
        return {user, board}
    } catch (error) {
        throw error
    }
}

const starBoard = async (userId, boardId) => {
    try {
        const user = await User.findByIdAndUpdate(userId, {
            $push: {starred: boardId}
        });
        if (!user) {
            throwError(404, `The user ${userId} was not found`)
        }
        const board = await Board.findOneAndUpdate({_id: boardId}, {
            $push: {starred: user._id}
        });
        if (!board) {
            throwError(404, `The board ${boardId} was not found`)
        }
        return board
    } catch (error) {
        throw error
    }
}


module.exports = {
    getByEmail,
    addUser,
    getById,
    unstarBoard,
    starBoard
}