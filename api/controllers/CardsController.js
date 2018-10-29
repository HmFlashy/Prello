const List = require('../models/index').List;
const Card = require('../models/index').Card;
const mongoose = require('mongoose');
const throwError = require("../helper/RequestHelper").throwError;

const getCardById = async (cardId) => {
    try {
        const card = await Card.findById(cardId)
        return card
    } catch (error) {
        throw error
    }
};

const addCard = async (name, listId) => {
    let session = null
    try {
        session = await mongoose.startSession()
        session.startTransaction();
        const card = new Card({
            name: name,
            list: listId
        });
        const savedCard = await card.save();
        await List.findOneAndUpdate({ _id: listId },
            { $push: { cards: savedCard } }, { "new": true })
        await session.commitTransaction();
        session.endSession();
        return savedCard
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error
    }
};

const getCards = async () => {
    try {
        return await Card.find({})
    }
    catch (error) {
        throw error
    }
};

const updateCard = async (cardId, data) => {
    try {
        return await Card.findOneAndUpdate({ _id: cardId }, { $set: data }, { "new": true })
    } catch (error) {
        throw error
    }
}

const addToArray = async (cardId, key, data) => {
    try {
        return await Card.findOneAndUpdate({ _id: cardId },
            { $push: { [key]: data } }, { "new": true })
    } catch (error) {
        throw error
    }
}

const removeToArray = async (cardId, key, data) => {
    try {
        return await Card.findOneAndUpdate({ _id: cardId },
            { $pull: { [key]: data } }, { "new": true })
    } catch (error) {
        throw error
    }
}

const deleteCard = async (cardId) => {
    let session = null
    try {
        session = await mongoose.startSession()
        session.startTransaction();
        const card = await Card.findById(cardId)
        if(!card) {
            throwError(404, `The card ${cardId} was not found`)
        }
        if(!card.isArchived) {
            throwError(400, "Can't delete a card not archived")
        }
        card.remove();
        await session.commitTransaction();
        session.endSession();
        return card
    } catch (error) {
        console.log(error)
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
}


module.exports = {
    getCardById,
    getCards,
    addCard,
    updateCard,
    addToArray,
    removeToArray,
    deleteCard
};
