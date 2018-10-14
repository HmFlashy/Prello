const db = require('../models');
const mongoose = require('mongoose');

const getCardById = (req) => {
    return new Promise((resolve, reject) => {
        const card = new db.Card({
            _id: new mongoose.Types.ObjectId(),
            name: 'My Card'});
        card
            .save((err, card) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(card)
                }
            })
    })
};

module.exports = {
    getCardById
};
