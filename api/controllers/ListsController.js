const db = require('../models');

const addList = async (name, boardID) => {
    const list = new db.List({
        name: name,
        board: boardID
    });
    try{
        const savedList = await list.save();
        const board = await db.Board.findById(boardID);
        board.lists.push(savedList)
        await board.save()
        return savedList
    } catch(error) {
        throw error
    }
}

module.exports = {
    addList
};