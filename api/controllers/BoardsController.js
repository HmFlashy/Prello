const db = require('../models');
const mongoose = require('mongoose');

module.exports = {
    async getBoardById(id) {
        console.log(db.Board)
        try {
            const board = await db.Board.findById(id).populate({
                path: 'lists',
                populate: {
                    path: 'cards'
                }
              })
            return board
        } catch(error) {
            throw error
        }
    }
}
