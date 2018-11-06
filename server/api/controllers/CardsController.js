const List = require("../models/index").List;
const Card = require("../models/index").Card;
const throwError = require("../helper/RequestHelper").throwError;

const getCardById = async (cardId) => {
    try {
        const card = await Card.findById(cardId).populate(
            [{
                path: "labels"
            }, {
                path: "members"               
            },
            {
                path: "list"
            }]
        )
        console.log(card)
        return card
    } catch (error) {
        throw error
    }
};

const addCard = async (name, listId) => {
    let card = null;
    let list = null;
    try {
        const list = await List.findById(listId);
        if (!list) throwError(404, 'LIST_NOT_FOUND');

        card = new Card({
            name: name,
            list: listId,
            board: list.board
        });
        let array = [];
        array.push(card.save());
        array.push(List.updateOne({ _id: listId },
            { $push: { cards: card } }));
        [card] = await Promise.all(array);
        return card
    } catch (error) {
        try {
            if (card) await card.remove();
            await list.save();
        } catch (error) {
            console.log("DB corrupted!!!");
            throw error
        }
        throw error
    }
};

const moveCard = async (cardId, newListId, pos) => {
    let oldList = null;
    let newList = null;
    let card = null;
    try {
        let array = [];
        array.push(await List.findOne({ cards: { $in: [cardId] } }));
        array.push(await List.findById(newListId).exec());
        array.push(await Card.findById(cardId));
        [oldList, newList, card] = await Promise.all(array);
        if (!oldList) throwError(404, `OLD_LIST_NOT_FOUND`);
        if (!card) throwError(404, `CARD_NOT_FOUND`);
        if (!newList) throwError(404, `NEW_LIST_NOT_FOUND`);

        array = [];
        array.push(await List.updateOne({ _id: card.list }, { $pull: { cards: cardId } }));
        array.push(await List.updateOne({ _id: newListId }, { $push: { cards: cardId } }));
        array.push(await Card.findOneAndUpdate({ _id: cardId }, {
            list: newListId,
            board: newList.board,
            pos
        }));
        const [oldListUpdated, newListUpdated, cardUpdated] = await Promise.all(array);
        if (!cardUpdated) throwError(404, `CARD_NOT_FOUND`);
        return cardUpdated;
    } catch (error) {
        try {
            if (oldList) await oldList.save();
            if (newList) await newList.save();
            if (card) await card.save();
        } catch (error) {
            console.log("DB corrupted !!!");
            throw error
        }
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
    try {
        const card = await Card.findById(cardId);
        if (!card) {
            throwError(404, `The card ${cardId} was not found`)
        }
        if (!card.isArchived) {
            throwError(400, "Can't delete a card not archived")
        }
        card.remove();
        return card
    } catch (error) {
        console.log(error)
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
