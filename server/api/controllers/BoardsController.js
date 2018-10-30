const Board = require("../models/index").Board
const User = require("../models/index").User
const Team = require("../models/index").Team
const throwError = require("../helper/RequestHelper").throwError;
const mongoose = require("mongoose");

const getBoardById = async (boardId) => {
    try {
        const board = await Board.findById(boardId).populate(
            [{
                path: "lists",
                select: ["_id", "name", "creator", "isArchived", "listInformation",
                    "activities"],
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
            }, {
                path: "members.member",
                select: ["_id", "name", "email", "fullName", "initials", "username",
                    "organization", "teams"],
                populate: {
                    path: "teams.team",
                    select: ["_id", "name"]
                }
            }, {
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
            _id: 1, name: 1, starred: 1
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
            return { _id: boards[0]._id, name: boards[0].name, lists: boards[0].lists.map(list => { return { name: list.name, _id: list._id, cards: list.cards.map(card => card.pos) } }) }
        }
        return boards
    } catch (error) {
        throw error
    }
};

const addBoard = async (name, visibility, teamId, userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throwError(404, `The user ${userId} was not found`)
        }
        if (teamId) {
            const team = await Team.findById(teamId);
            if (!team) {
                throwError(404, `The team ${teamId} was not found`)
            }
            const savedBoard = await Board.create({
                name: name,
                teams: [team._id],
                visibility: visibility,
                owner: user._id,
                members: [{ member: user._id, role: "Admin" }]
            });
            return savedBoard;
        } else {
            const savedBoard = await Board.create({
                name: name,
                visibility: visibility,
                owner: user._id,
                members: [{ member: user._id, role: "Admin" }]
            });
            return savedBoard;
        }
    } catch (error) {
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


const addBoardMember = async (boardId, body) => {
    let session = null
    try {
        session = await mongoose.startSession();
        session.startTransaction();
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
        await session.commitTransaction();
        session.endSession();
        return board;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error
    }
};

const addBoardTeam = async (boardId, body) => {
    let session = null
    try {
        session = await mongoose.startSession();
        session.startTransaction();
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
        await session.commitTransaction();
        session.endSession();
        return board;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error
    }
};

const deleteBord = async (boardId) => {
    let session = null
    try {
        session = await mongoose.startSession();
        session.startTransaction();
        const board = await Board.findById(boardId);
        if (!board) {
            throwError(404, `The board ${boardId} was not found`)
        }
        if (!board.isClosed) {
            throwError(400, `Can't delete a board not closed`)
        }
        board.remove()

        await session.commitTransaction();
        session.endSession();
        return board;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error
    }
}

module.exports = {
    getBoardById,
    getBoards,
    addBoard,
    addBoardTeam,
    addBoardMember,
    deleteBord,
    updateBoard,
    getBoardsInfo
};