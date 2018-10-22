const db = require("../models");
const mongoose = require("mongoose");
const throwIf = require("../helper/RequestHelper").throwIf;
const throwError = require("../helper/RequestHelper").throwError;

const addList = async (name, boardId) => {
    let session = null
    try {
        session = await mongoose.startSession()
        session.startTransaction();
        const board = await db.Board.findById(boardId)
        if(!board) {
            throwError(400, "Bad Request", "Board not found")
        }
        const savedList = await db.List.create({
            name: name,
            board: boardId
        });
        if(!savedList) {
            throwError(500, "Internal server issue")
        }
        const boardUpdated = await db.Board.findByIdAndUpdate(boardId, {$push: {lists: savedList._id}}, {new: true})
        if(!boardUpdated) {
            throwError(500, "Internal server issue")
        }
        await session.commitTransaction();
        session.endSession();
        return savedList
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

const deleteList = async (listId) => {
    let session = null
    try {
        session = await mongoose.startSession();
        session.startTransaction();
        const list = await db.List.findById(listId)
        if(!list) {
            throwError(400, "List not found")
        }
        if (list.isArchived) {
            if (list.cards.length === 0) {
                const board = await db.Board.findByIdAndUpdate(list.board,
                    {$pull: {lists: listId}});
                if(!board) {
                    throwError(400, "Board not found")
                }
                await list.remove();
                await session.commitTransaction();
                session.endSession();
                return list;
            } else {
                throwError(400, "Can't delete a list not empty")
            }
        } else {
            throwError(400, "Can't delete a list not archived")
        }
    } catch (error) {
        await session.abortTransaction();
        throw error;
    }
};

const updateList = async (listId, body) => {
    try {
        const list = await db.List.findByIdAndUpdate(listId, {$set: body}, {new: true});
        if(!list) {
            throwError(400, "List not found")
        }
        return list
    } catch (error) {
        return error
    }
};

module.exports = {
    addList,
    deleteList,
    updateList
};