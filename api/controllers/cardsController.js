const db = require('../models');
const mongoose = require('mongoose');

const getCardById = (id) => {
    return db.Card.findOne({_id: id}).then((card, err) =>{
        if(err) {
            return Promise.reject(err)
        } else {
            return Promise.resolve(card)
        }
    })
};

const addCard = (name, listId) => {
    const card = new db.Card({
        name: name,
        listId: listId
    });
    return card.save()
    .then(card => {
        return Promise.resolve(card)
    })
    .catch(error => {
        return Promise.reject(error)
    })
}

const getCards = () => {
    return db.Card.find({})
    .then(cards => Promise.resolve(cards))
    .catch(err => Promise.reject(err))
};

const updateCardName = async (cardId, name) => {
    try {
        return await db.Card.findOneAndUpdate({ _id: cardId}, { $set: { name: name}}, { "new": true})
    } catch(error) {
        return error
    }

}

module.exports = {
    getCardById,
    getCards,
    addCard,
    updateCardName
};
