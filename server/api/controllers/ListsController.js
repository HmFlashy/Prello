const List = require("../models/index").List;
const Board = require("../models/index").Board;
const throwError = require("../helper/RequestHelper").throwError;

const addList = async (name, boardId, pos) => {
    let list = null
    let board = Board.findById(boardId);
    try {
        const board = await Board.findById(boardId)
        if (!board) {
            throwError(404, `The board ${boardId} was not found`)
        }
        list = await List.create({
            name: name,
            board: boardId,
            pos: pos
        });
        if (!list) {
            throwError(500, "Internal server issue")
        }
        const boardUpdated = await Board.findByIdAndUpdate(boardId, { $push: { lists: list._id } }, { new: true })
        if (!boardUpdated) {
            throwError(500, "Internal server issue")
        }
        return list
    } catch (error) {
        try {
            if (list) await list.remove();
            await board.save();
        } catch (error) {
            console.log("DB corrupted");
            throw error
        }
        throw error;
    }
};

const deleteList = async (listId) => {
    try {
        const list = await List.findById(listId)
        if (!list) {
            throwError(404, `The listId ${listId} was not found`)
        }
        if (list.isArchived) {
            if (list.cards.length === 0) {
                const board = await Board.findByIdAndUpdate(list.board,
                    { $pull: { lists: listId } });
                if (!board) {
                    throwError(404, "Board not found")
                }
                await list.remove();
                return list;
            } else {
                throwError(400, "Can't delete a list not empty")
            }
        } else {
            throwError(400, "Can't delete a list not archived")
        }
    } catch (error) {
        throw error;
    }
};

const updateList = async (listId, body) => {
    try {
        const list = await List.findByIdAndUpdate({ _id: listId }, { $set: body }, { new: true });
        if (!list) {
            throwError(404, `The listId ${listId} was not found`)
        }
        return list
    } catch (error) {
        throw error
    }
};

const getById = async (listId) => {
    try {
        const list = await List.findById(listId)
        if (!list) {
            throwError(404, `The list ${listId} was not found`)
        }
        return list
    } catch (error) {
        throw error
    }
}

module.exports = {
    addList,
    deleteList,
    updateList,
    getById
};