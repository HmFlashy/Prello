const db = require('../models');
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
        const card = new db.Card({
            name: name,
            list: listId
        });
        const savedCard = await card.save()
        await dbList.findOneAndUpdate({ _id: listId },
            { $push: { cards: savedCard } }, { "new": true })
        return savedCard
    } catch (error) {
        throw error
    }
}

const moveCard = async (cardId, oldList, newList, boardId, pos) => {
    try {
        await dbList.findOneAndUpdate({ _id: oldList }, { $pull: { cards: cardId } })
        await dbList.findOneAndUpdate({ _id: newList }, { $push: { cards: cardId } })
        return await db.Card.findOneAndUpdate({ _id: cardId }, { list: newList, board: boardId, pos })
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
    removeToArray,
    moveCard
};
