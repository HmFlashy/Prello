const User = require("../models/index").User;
const Board = require("../models/index").Board;
const Category = require("../models/index").Category;
const throwError = require("../helper/RequestHelper").throwError;
const passwordHelper = require("../helper/passwordHelper");
const ClientApplication = require("../../oauth/server/models").OAuthClients
const logger = require("../../logger")

const getByEmail = async (email) => {
    try {
        const user = await User.findOne({ email: email })
        return user
    } catch (error) {
        logger.error(error.message)
        throw error
    }
}

const getById = async (userId) => {
    try {
        const user = await User.findById(userId).populate([{
            path: "teams.team",
            select: ["name","boards", "members"],
            populate: ["boards", {
                path:"members.member"}]
        },
        {
            path: "client_applications"
        }]);
        return user
    } catch (error) {
        logger.error(error.message)
        throw error
    }
}

const addUser = async (firstname, lastname, username, email, password, organization, ldapId) => {
    try {
        const existingUsers = await User.find({ $or: [{ username: this.username }, { email: this.email }] });
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
        logger.error(error.message)
        throw error
    }
}

const getUserByEmailOrUsername = async (username, email) => {
    try {
        return await User.findOne({ $or: [{ username: username}, {email: email}] })
    } catch (error) {
        logger.error(error.message)
        throw error
    }
}

const unstarBoard = async (userId, boardId) => {
    try {
        const user = await User.findByIdAndUpdate(userId, {
            $pull: { starred: boardId }
        });
        if (!user) {
            throwError(404, `The user ${userId} was not found`)
        }
        const board = await Board.findOneAndUpdate({ _id: boardId }, {
            $pull: { starred: user._id }, $inc: { "boardInformation.nbStars": -1 }
        })
        if (!board) {
            throwError(404, `The board ${boardId} was not found`)
        }
        return { user, board }
    } catch (error) {
        logger.error(error.message)
        throw error
    }
}

const starBoard = async (userId, boardId) => {
    try {
        const user = await User.findByIdAndUpdate(userId, {
            $push: { starred: boardId }
        });
        if (!user) {
            throwError(404, `The user ${userId} was not found`)
        }
        const board = await Board.findOneAndUpdate({ _id: boardId }, {
            $push: { starred: user._id }, $inc: { "boardInformation.nbStars": 1 }
        });
        if (!board) {
            throwError(404, `The board ${boardId} was not found`)
        }
        return board
    } catch (error) {
        logger.error(error.message)
        throw error
    }
}

const getUsersWithQuery = async (query) => {
    try {
        const users = await User.find({ $or: [{ username: new RegExp(query, "i") }, { email: new RegExp(query, "i") }] })
        if (!users) {
            throwError(404, `No users was found`)
        }
        return users
    } catch (error) {
        logger.error(error.message)
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
        await User.updateOne({ _id: user._id }, { $push: { categories: category } });
        return category
    } catch (error) {
        logger.error(error.message)
        throw error
    }
}

const deleteCategory = async (userId, categoryId) => {
    let user = null;
    try {
        const category = await Category.findById(categoryId)
        user = await User.findByIdAndUpdate({ _id: userId }, { $pull: { categories: { _id: categoryId } } });
        await Category.deleteOne({ _id: category._id });
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
        logger.error(error.message)
        throw error
    }
}

const updateCategoryName = async (userId, categoryId, name) => {
    let user = null;
    try {
        const newCategory = await Category.findOneAndUpdate({ _id: categoryId }, { $set: { name: name } }, { new: true })
        user = await User.findByIdAndUpdate({ _id: userId }, { $pull: { categories: { _id: categoryId } } });
        user = await User.findByIdAndUpdate({ _id: userId }, { $push: { categories: newCategory } });
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
        logger.error(error.message)
        throw error
    }
}

const updateBoardCategory = async (userId, boardId, categoryId) => {
    try {
        const user = await User.findById(userId)
        const category = categoryId ? await Category.findById(categoryId) : null
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
        logger.error(error.message)
        throw error
    }
}

const rand_string = (n) => {
    if (n <= 0) {
        return "";
    }
    var rs = "";
    try {
        rs = crypto.randomBytes(Math.ceil(n / 2)).toString('hex').slice(0, n);
        /* note: could do this non-blocking, but still might fail */
    }
    catch (ex) {
        /* known exception cause: depletion of entropy info for randomBytes */
        console.error("Exception generating random string: " + ex);
        /* weaker random fallback */
        rs = '';
        var r = n % 8, q = (n - r) / 8, i;
        for (i = 0; i < q; i++) {
            rs += Math.random().toString(16).slice(2);
        }
        if (r > 0) {
            rs += Math.random().toString(16).slice(2, i);
        }
    }
    return rs;
}

const updateUser = async (userId, fullName, username, email, bio, organization, newPassword) => {
    try {
        const hash = newPassword ? await passwordHelper.passwordHelper(newPassword) : undefined
        if (hash) {
            return await User.findOneAndUpdate({ _id: userId }, { $set: { fullName, username, email, bio, organization, hash } }, { "new": true })
        }
        else {
            return await User.findOneAndUpdate({ _id: userId }, { $set: { fullName, username, email, bio, organization } }, { "new": true })
        }
    } catch (error) {
        logger.error(error.message)
        throw error
    }
}

const addClientApplication = async (userId, name) => {
    let user = null;
    try {
        user = await User.findById(userId);
        const id = rand_string(12)
        const secret = rand_string(20)
        const clientApplication = await ClientApplication.create({
            name: name,
            id: id,
            secret: secret,
            redirectUris: [],
            grants: ["authorization_code", "refresh_token"],
            user: user
        });
        await User.updateOne({ _id: user._id }, { $push: { client_applications: clientApplication } });
        return clientApplication
    } catch (error) {
        logger.error(error.message)
        throw error
    }
}

const addRedirectUri = async (clientId, uri) => {
    try {
        const clientApplication = await ClientApplication.updateOne({ _id: clientId }, { $push: { redirectUris: uri } }, { new: true });
        return clientApplication
    } catch (error) {
        logger.error(error.message)
        throw error
    }
}

const removeRedirectUri = async (clientId, uri) => {
    try {
        const clientApplication = await ClientApplication.updateOne({ _id: clientId }, { $pull: { redirectUris: uri } }, { new: true });
        return clientApplication
    } catch (error) {
        logger.error(error.message)
        throw error
    }
}

const getMembersBySearch = async (boardId, query) => {
    try {
        const board = await Board.findById(boardId);
        if (!board) {
            throwError(404, "Board not found")
        }
        const members = await User.find({
            $and: [
                {
                    "_id": {$nin: board.members.map(boardMember => boardMember.member)}
                }, {
                    $or: [{"fullName": {$regex: `.*${query}*.`, $options: "i"}},
                        {"email": {$regex: `.*${query}*.`, $options: "i"}}]
                }
            ]
        }).sort({"fullName": 1}).limit(10);
        return members
    } catch (error) {
        logger.error(error.message)
        throw error
    }
}

const deleteTeam = async (userId, teamId) => {
    try {
        const user = await User.findOneAndUpdate({_id: userId}, {
            $pull:
                { teams: {team:teamId }}
        }, { new: true });
        if (!user) {
            throwError(404, `The user ${userId} was not found`)
        }
        return user;
    } catch (error) {
        logger.error(error.message)
        throw error
    }
};

module.exports = {
    getByEmail,
    addUser,
    getById,
    getUserByEmailOrUsername,
    unstarBoard,
    starBoard,
    getUsersWithQuery,
    addCategory,
    deleteCategory,
    updateCategoryName,
    updateBoardCategory,
    addClientApplication,
    addRedirectUri,
    removeRedirectUri,
    getMembersBySearch,
    updateUser,
    deleteTeam
}