const db = require('../models');
const mongoose = require('mongoose');

const getCardById = (req) => {
    return new Promise((resolve, reject) => {
        const id = req.params.idCard
        db.Card.findOne({_id: id}).then((card, err) =>{
            if(err) {
                reject(err)
            } else {
                resolve(card)
            }
        })
    })
};

const addCard = (req) => {
    return new Promise((resolve, reject) => {
        const name = req.params.nameCard
        const card = new db.Card({
            _id: new mongoose.Types.ObjectId(),
            name: name});
        card.save((err, card) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(card)
                }
            })
    })
}

const getCards = () => {
    return new Promise((resolve, reject) => {
        db.Card.find({}).then((cards, err) => {
            if(err) {
                reject(err)
            } else {
                resolve(cards)
            }
        })
    })
};

module.exports = {
    getCardById,
    getCards,
    addCard
};
