const User = require("../models/index").User;
const Board = require("../models/index").Board;
const Category = require("../models/index").Category;
const throwError = require("../helper/RequestHelper").throwError;
const passwordHelper = require("../helper/passwordHelper");
const mongoose = require("mongoose")

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
        const user = await User.findById(userId).populate({
            path: "teams.team",
            select: ["name"]
        });
        return user
    } catch (error) {
        throw error
    }
}

const addUser = async (firstname, lastname, username, email, password, organization, ldapId) => {
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
            initials: `${firstname.slice(0, 1)}${lastname.slice(0, 1)}`,
            username,
            email,
            hash: hash,
            organization,
            ldapId
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
        if (!user) {
            throwError(404, `The user ${userId} was not found`)
        }
        const board = await Board.findOneAndUpdate({_id: boardId}, {
            $pull: {starred: user._id}, $inc: {"boardInformation.nbStars": -1}
        })
        if (!board) {
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
            $push: {starred: user._id}, $inc: {"boardInformation.nbStars": 1}
        });
        if (!board) {
            throwError(404, `The board ${boardId} was not found`)
        }
        return board
    } catch (error) {
        throw error
    }
}

const getUsersWithQuery = async (query) => {
    try {
        const users = await User.find({$or: [{username: new RegExp(query)}, {email: new RegExp(query)}]})
        console.log(users)
        if (!users) {
            throwError(404, `No users was found`)
        }
        return users
    } catch (error) {
        throw error
    }
}

const addCategory = async (userId, name) => {
    let user = null;
    try {
        user = await User.findById(userId);
        const category = await Category.create({
            name: name
        });
        console.log(category)
        await User.updateOne({_id: user._id}, {$push: {categories: category}});
        return category
    } catch (error) {
        throw error
    }
}

const deleteCategory = async (userId, categoryId) => {
    let user = null;
    try {
        const category = await Category.findById(categoryId)
        user = await User.findByIdAndUpdate({_id: userId}, {$pull: {categories: {_id: categoryId}}});
        await Category.deleteOne({_id: category._id});
        const newUserBoards = user.boards.map(board => {
            if (board.category) {
                if (board.category._id.toString() === categoryId) {
                    board.category = undefined
                    return board
                }
                else return board;
            }
            else {
                return board
            }
        })
        user.boards = newUserBoards
        await user.save()
    } catch (error) {
        throw error
    }
}

const updateCategoryName = async (userId, categoryId, name) => {
    let user = null;
    try {
        const category = await Category.findById(categoryId)
        const newCategory = await Category.findOneAndUpdate({_id: categoryId}, {$set: {name: name}}, {new: true})
        user = await User.findByIdAndUpdate({_id: userId}, {$pull: {categories: {_id: categoryId}}});
        user = await User.findByIdAndUpdate({_id: userId}, {$push: {categories: newCategory}});
        const newUserBoards = user.boards.map(board => {
            if (board.category) {
                if (board.category._id.toString() === categoryId) {
                    board.category = newCategory
                    return board
                }
                else return board;
            }
            else {
                return board
            }
        })
        user.boards = newUserBoards
        await user.save()
    } catch (error) {
        throw error
    }
}

const updateBoardCategory = async (userId, boardId, categoryId) => {
    try {
        const user = await User.findById(userId)
        const category = categoryId?await Category.findById(categoryId):null
        const newBoards = user.boards.map(board => {
            if (board.board.toString() === boardId) {
                board.category = category
                return board
            }
            else return board;
        });
        user.boards = newBoards;
        await user.save();
        return user;
    } catch (error) {
        throw error
    }
}

module.exports = {
    getByEmail,
    addUser,
    getById,
    unstarBoard,
    starBoard,
    getUsersWithQuery,
    addCategory,
    deleteCategory,
    updateCategoryName,
    updateBoardCategory
}