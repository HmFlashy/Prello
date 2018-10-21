const db = require('../models');
const mongoose = require('mongoose');

const getCardById = async (id) => {
    try {
        const card = await db.Card.findById(id)
        return card
    } catch (error) {
        throw error
    }
};

const addCard = async (name, listId) => {
    const card = new db.Card({
        name: name,
        list: listId
    });
    try {
        const savedCard = await card.save()
        const list = await db.List.findById(listId)
        list.cards.push(savedCard)
        await list.save()
        return savedCard
    } catch (error) {
        throw error
    }
}

const getCards = () => {
    return db.Card.find({})
        .then(cards => Promise.resolve(cards))
        .catch(err => Promise.reject(err))
};

const updateCardName = async (cardId, name) => {
    try {
        return await db.Card.findOneAndUpdate({_id: cardId}, {$set: {name: name}}, {"new": true})
    } catch (error) {
        return error
    }

}

module.exports = {
    getCardById,
    getCards,
    addCard,
    updateCardName
};
