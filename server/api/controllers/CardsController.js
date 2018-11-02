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

const addCard = async (name, listId, boardId) => {
    let session = null
    try {
        session = await mongoose.startSession()
        session.startTransaction();
        const card = new Card({
            name: name,
            list: listId,
            board: boardId
        });
        const savedCard = await card.save();
        await List.findOneAndUpdate({ _id: listId },
            { $push: { cards: savedCard } }, { "new": true , session: session})
        throwError(400, "test")
        await session.commitTransaction();
        session.endSession();
        return savedCard
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error
    }
};

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
    deleteCard,
    moveCard
};
