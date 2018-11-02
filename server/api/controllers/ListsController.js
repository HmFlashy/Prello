const List = require("../models/index").List;
const Board = require("../models/index").Board;
const mongoose = require("mongoose");
const throwError = require("../helper/RequestHelper").throwError;

const addList = async (name, boardId) => {
    let session = null
    try {
        session = await mongoose.startSession()
        session.startTransaction();
        const board = await Board.findById(boardId)
        if(!board) {
            throwError(404, `The board ${boardId} was not found`)
        }
        const savedList = await List.create({
            name: name,
            board: boardId
        });
        if(!savedList) {
            throwError(500, "Internal server issue")
        }
        const boardUpdated = await Board.findByIdAndUpdate(boardId, {$push: {lists: savedList._id}}, {new: true})
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
        const list = await List.findById(listId)
        if(!list) {
            throwError(404, `The listId ${listId} was not found`)
        }
        if (list.isArchived) {
            if (list.cards.length === 0) {
                const board = await Board.findByIdAndUpdate(list.board,
                    {$pull: {lists: listId}});
                if(!board) {
                    throwError(404, "Board not found")
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
        session.endSession();
        throw error;
    }
};

const updateList = async (listId, body) => {
    try {
        const list = await List.findByIdAndUpdate({_id: listId}, {$set: body}, {new: true});
        if(!list) {
            throwError(404, `The listId ${listId} was not found`)
        }
        return list
    } catch (error) {
        throw error
    }
};

const getById = async(listId) => {
    try {
        const list = await List.findById(listId)
        if(!list){
            throwError(404, `The list ${listId} was not found`)
        }
        return list
    } catch(error) {
        throw error
    }
}

module.exports = {
    addList,
    deleteList,
    updateList,
    getById
};