const db = require('../models').Card;
const dbList = require('../models').List;
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
    try {
        const info = await new db.CardInformation().save()
        console.log(info._id)
        const card = new db.Card({
            name: name,
            list: listId,
            information: info._id
        });
        const savedCard = await card.save()
        await dbList.findOneAndUpdate({ _id: listId },
            { $push: { cards: savedCard } }, { "new": true })
        return savedCard
    } catch (error) {
        throw error
    }
}

const getCards = async () => {
    try {
        return await db.Card.find({})
    }
    catch (error) {
        throw error
    }
};

const updateCard = async (cardId, data) => {
    try {
        return await db.Card.findOneAndUpdate({ _id: cardId }, { $set: data }, { "new": true })
    } catch (error) {
        throw error
    }

}

const addToArray = async (cardId, key, data) => {
    try {
        return await db.Card.findOneAndUpdate({ _id: cardId },
            { $push: { [key]: data } }, { "new": true })
    } catch (error) {
        throw error
    }
}

const removeToArray = async (cardId, key, data) => {
    try {
        return await db.Card.findOneAndUpdate({ _id: cardId },
            { $pull: { [key]: data } }, { "new": true })
    } catch (error) {
        throw error
    }
}


module.exports = {
    getCardById,
    getCards,
    addCard,
    updateCard,
    addToArray,
    removeToArray
};
