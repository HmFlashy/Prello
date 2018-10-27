const db = require('../models');
const mongoose = require('mongoose');

module.exports = {
    async getBoardById(id) {
        try {
            const board = await db.Board.findById(id).populate({
                path: 'lists',
                populate: {
                    path: 'cards',
                    populate: [{
                        path: 'labels'
                    }, {
                        path: 'members'
                    }]
                }
              });
            return board
        } catch(error) {
            throw error
        }
    },
    async getBoards() {
        try {
            const boards = await db.Board.find({})
            return boards
        } catch(error) {
            throw error
        }
    }
}
