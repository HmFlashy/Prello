const db = require("../models");
const throwError = require("../helper/RequestHelper").throwError;
const mongoose = require("mongoose");

const getBoardById = async (boardId) => {
    try {
        const board = await db.Board.findById(boardId).populate(
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
                    "organization", "teams"]

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
            throwError(400, `The board ${boardId} was not found`)
        }
        return board
    } catch (error) {
        throw error
    }
};

const getBoards = async () => {
    try {
        const boards = await db.Board.find().select({
            _id: 1, name: 1, starred: 1
        });
        return boards
    } catch (error) {
        throw error
    }
};

const createBoard = async (name, visibility, teamId, userId) => {
    try {
        const user = await db.User.User.findById(userId);
        if (!user) {
            throwError(400, `The user ${userrId} was not found`)
        }
        if (teamId) {
            const team = await db.Team.findById(teamId);
            if (!team) {
                throwError(400, `The team ${teamId} was not found`)
            }
            const savedBoard = await db.Board.create({
                name: name,
                teams: [team._id],
                visibility: visibility,
                owner: user._id,
                members: [{member: user._id, role: "Admin"}]
            });
            return savedBoard;
        } else {
            const savedBoard = await db.Board.create({
                name: name,
                visibility: visibility,
                owner: user._id,
                members: [{member: user._id, role: "Admin"}]
            });
            return savedBoard;
        }
    } catch (error) {
        throw error
    }
};

const addBoardMemberById = async (boardId, userId) => {
    let session = null
    try {
        session = await mongoose.startSession();
        session.startTransaction();
        const user = await db.User.findById(userId);
        if (!user) {
            throwError(400, `The user ${userId} was not found`)
        }

        const board = await db.Board.findOneAndUpdate(boardId, {
            $push: {
                members:
                    {member: user._id, role: "Member"}
            }
        }, {new: true});
        if (!board) {
            throwError(400, `The board ${boardId} was not found`)
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

const addBoardMemberByEmail = async (boardId, userEmail) => {
    let session = null
    try {
        session = await mongoose.startSession()
        session.startTransaction();
        const user = await db.User.findOneAndUpdate({email: userEmail}, {
            $push:
                {boards: {board: boardId, role: "Member"}}
        }, {new: true});
        if (!user) {
            throwError(400, "User not found")
        }

        const board = await db.Board.findByIdAndUpdate(boardId, {
            $push: {
                members:
                    {member: user._id, role: "Member"}
            }
        }, {new: true});
        if (!board) {
            throwError(400, "Board not found")
        }
        await session.commitTransaction();
        session.endSession();
        return board
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error
    }
};

module.exports = {
    getBoardById,
    getBoards,
    createBoard,
    addBoardMemberById,
    addBoardMemberByEmail
};