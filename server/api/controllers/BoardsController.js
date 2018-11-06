const Board = require("../models/index").Board;
const User = require("../models/index").User;
const Team = require("../models/index").Team;
const Category = require("../models/index").Category;
const ListsController = require("./ListsController")
const throwError = require("../helper/RequestHelper").throwError;
const mongoose = require("mongoose");

const getBoardById = async (boardId) => {
    try {
        const board = await Board.findById(boardId).populate(
            [{
                path: "lists",
                select: ["_id", "name", "creator", "isArchived", "listInformation",
                    "activities", "pos"],
                populate: {
                    path: "cards",
                    select: ["_id", "name", "dueDate", "dueDateCompleted",
                        "isArchived", "labels", "members", "pos", "cardInformation",
                        "creator", "watchers", "pos", "activities"],
                    populate: ["labels",
                        {
                            path: "members",
                            select: ["_id", "name", "email", "fullName", "initials", "username"]
                        }
                    ]
                }
            }, 
             {
                path: "members.member",
                select: ["_id", "name", "email", "fullName", "initials", "username",
                    "organization", "teams"],
                populate: {
                    path: "teams.team",
                    select: ["_id", "name"]
                }
            },
            {
                path: "teams",
                select: ["_id", "name", "members"],
                populate: {
                    path: "members.member",
                    select: ["_id", "role", "name", "email", "fullName", "initials", "username",
                        "organization", "teams"],
                }
            }, {
                path: "owner",
                select: ["_id"]
            }, {
                path: "activities"
            },
             {
                path: "labels"
             }
            ]);
        if (!board) {
            throwError(404, `The board ${boardId} was not found`)
        }
        return board
    } catch (error) {
        throw error
    }
};

const getBoards = async (user) => {
    try {
        const boards = await Board.find({"members.member": {$in: [user._id]}}).select({
            _id: 1, name: 1, boardInformation: 1, starred: 1, teams: 1
        });
        return boards
    } catch (error) {
        throw error
    }
};

const getBoardsInfo = async (boardId) => {
    try {
        const boards = await Board.find({ _id: boardId }).populate([{
            path: "lists",
            select: ["name"],
            populate: {
                path: "cards",
                select: ["pos"],
            }
        }]).select(["_id", "name"]);
        if (boards && boards[0]) {
            return {
                _id: boards[0]._id,
                name: boards[0].name,
                lists: boards[0].lists.map(list => {
                    return {
                        name: list.name,
                        _id: list._id,
                        cards: list.cards.map(card => card.pos)
                    }
                })
            }
        }
        return boards
    } catch (error) {
        throw error
    }
};

const addBoard = async (name, visibility, teamId, userId, categoryId) => {
    let newBoard = null;
    let user = null;
    let team = null;
    try {
        user = await User.findById(userId);
        if (!user) {
            throwError(404, `The user ${userId} was not found`)
        }
        console.log(categoryId)
        const category = await Category.findById(categoryId);
        if (categoryId) {
            if (!category) throwError(404, `The category ${categoryId} was not found`);
            console.log(JSON.stringify(user.categories));
            if (!user.categories.find(userCategory => userCategory._id.toString() === category._id.toString())) {
                throwError(400, `The category ${categoryId} doesn't belong to the user`)
            }
        }

        if (teamId) {
            team = await Team.findById(teamId);
            if (!team) {
                throwError(404, `The team ${teamId} was not found`)
            }
            newBoard = await Board.create({
                name: name,
                teams: [team._id],
                visibility: visibility,
                owner: user._id,
                members: [{ member: user._id, role: "Admin" }]
            });
            await Team.updateOne({ _id: team._id }, { $push: { boards: newBoard._id } });
        } else {
            newBoard = await Board.create({
                name: name,
                visibility: visibility,
                owner: user._id,
                members: [{ member: user._id, role: "Admin" }]
            });
        }
        await User.updateOne({ _id: user._id }, {
            $push: {
                boards: {
                    board: newBoard._id,
                    role: "Admin",
                    category: category
                }
            }
        });
        return newBoard;
    } catch (error) {
        try {
            if (team) await team.save();
            if (user) await user.save();
            if (newBoard) await newBoard.remove();
        } catch (error) {
            console.log("DB corrupted !!!");
            throw error;
        }
        throw error
    }
};

const updateBoard = async (boardId, data) => {
    try {
        return await Board.findOneAndUpdate({ _id: boardId }, { $set: data }, { "new": true })
    } catch (error) {
        throw error
    }
}
const addLabel = async (boardId, label) => {
    try {
        await Board.findOneAndUpdate({ _id: boardId },
            { $push: { labels: label } }, { "new": true })
    } catch (error) {
        throw error
    }
}
const removeLabel = async (boardId, labelId) => {
    try {
        const board = await Board.findOneAndUpdate({ _id: boardId },
        { $pull: { labels: labelId } }, { "new": true })
        const boardLists = board.lists
        boardLists.forEach(boardList => ListsController.removeLabel(boardList._id, labelId))
    } catch (error) {
        throw error
    }
}

const addBoardMember = async (boardId, body) => {
    try {
        const user = await User.findOneAndUpdate(body, {
            $push:
                { boards: { board: boardId, role: "Member" } }
        }, { new: true });
        if (!user) {
            throwError(404, `The user ${JSON.stringify(body)} was not found`)
        }
        const board = await Board.findOneAndUpdate({ _id: boardId }, {
            $push: {
                members:
                    { member: user._id, role: "Member" }
            }
        }, { new: true });
        if (!board) {
            throwError(404, `The board ${boardId} was not found`)
        }
        return board;
    } catch (error) {
        throw error
    }
};

const addBoardTeam = async (boardId, body) => {
    try {
        const team = await Team.findOneAndUpdate(body, {
            $push:
                { boards: boardId }
        }, { new: true });
        if (!team) {
            throwError(404, `The team ${JSON.stringify(body)} was not found`)
        }
        const board = await Board.findOneAndUpdate({ _id: boardId }, {
            $push: {
                teams: team._id
            }
        }, { new: true });
        if (!board) {
            throwError(404, `The board ${boardId} was not found`)
        }
        return board;
    } catch (error) {
        throw error
    }
};

const deleteBord = async (boardId) => {
    try {
        const board = await Board.findById(boardId);
        if (!board) {
            throwError(404, `The board ${boardId} was not found`)
        }
        if (!board.isClosed) {
            throwError(400, `Can't delete a board not closed`)
        }
        board.remove()

        return board;
    } catch (error) {
        throw error
    }
}


module.exports = {
    getBoardById,
    getBoards,
    addBoard,
    addLabel,
    removeLabel,
    addBoardTeam,
    addBoardMember,
    deleteBord,
    updateBoard,
    getBoardsInfo
};