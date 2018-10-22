const db = require('../models');
const mongoose = require('mongoose');
const throwIf = require('../helper/RequestHelper').throwIf;
const throwError = require('../helper/RequestHelper').throwError;

const addList = async (name, boardId) => {
    let session = null
    try{
        await mongoose.startSession()
            .then(async(_session) => {
                session = _session
                try {
                    session.startTransaction();
                    const savedList = await db.List.create({
                        name: name,
                        board: boardId
                    });
                    throwIf(r => !r, 404, 'Not Found', 'Board not found')(savedList);
                    const board = await db.Board.findOneAndUpdate(boardId, {$push: {lists: savedList._id}}, {new: true})
                    throwIf(r => !r, 404, 'Not Found', 'Board not found')(board);
                    await session.commitTransaction();
                    session.endSession();
                    return savedList
                }catch (error) {
                    throw error
                }
            })
    } catch(error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

const deleteList = async (listId) => {
    let session = null
    try{
        session = await mongoose.startSession();
        session.startTransaction();
        const list = await db.List.findById(listId)
        if(list.isArchived){
            if(list.cards.length === 0) {
                const board = await db.Board.findByIdAndUpdate(list.board,
                    {$pull: {lists: listId}});

                await list.remove();
                await session.commitTransaction();
                session.endSession();
                return list;
            } else {
                throwError(404, 'Bad Request', "Can't delete a list not empty")
            }
        } else {
            throwError(404, 'Bad Request', "Can't delete a list not archived")
        }
    } catch(error) {
        await session.abortTransaction();
        throw error;
    }
};

const archivedList = async (listId) => {
    try{
        await db.List.findByIdAndUpdate(listId,
            {$set: {isArchived: true}})
    } catch(error) {
        throw error
    }
};

const updateListName = async (listId, name) => {
    try {
        return await db.List.findOneAndUpdate({_id: listId}, {$set: {name: name}}, {"new": true})
    } catch (error) {
        return error
    }

};

const updateList = async (listId, body) => {
    try {
        return await db.List.findOneAndUpdate({_id: listId}, {$set: body}, {"new": true})
    } catch (error) {
        return error
    }
};

module.exports = {
    addList,
    deleteList,
    updateList
};