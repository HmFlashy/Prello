const Card = require('../models').Card;
const Checklist = require('../models').Checklist;
const Item = require('../models').Item;
const mongoose = require('mongoose');

const addChecklist = async (name, cardId) => {
    try {
        const newChecklist = await Card.findOneAndUpdate({ _id: cardId },
            {
                $push: {
                    checklists: new Checklist({
                        title: name,
                        item: []
                    })
                }
            }, { "new": true })
        return newChecklist
    } catch (error) {
        throw error
    }
}

const deleteChecklist = async (cardId, checklistId) => {
    try {
        const card = await Card.findOneAndUpdate({ _id: cardId },
            {
                $pull: { checklists: { _id: checklistId } }
            }, { "new": true })
        return card
    } catch (error) {
        throw error
    }
}

const updateChecklist = async (cardId, checklistId, name) => {
    try {
        const newCard = await Card.find({ "_id": cardId })
        for (let index = 0; index < newCard[0].checklists.length; index++) {
            if (newCard[0].checklists[index]._id == checklistId) {
                newCard[0].checklists[index].title = name
            }
        }
        return await Card.findOneAndUpdate({ _id: cardId }, {
            $set: {
                checklists: newCard[0].checklists
            }
        }, { "new": true })
    } catch (error) {
        throw error
    }
}

const addItem = async (cardId, checklistId, name) => {
    try {
        const newCard = await Card.find({ "_id": cardId })
        newCard[0].checklists.forEach(checklist => checklist._id == checklistId ? checklist.items.push(new Item({ name })) : checklist)
        return await Card.findOneAndUpdate({ _id: cardId },
            {
                $set: { checklists: newCard[0].checklists }
            }, { "new": true })
    } catch (error) {
        throw error
    }
}

const deleteItem = async (cardId, checklistId, itemId) => {
    try {
        const newCard = await Card.find({ "_id": cardId })
        for (let index = 0; index < newCard[0].checklists.length; index++) {
            if (newCard[0].checklists[index]._id == checklistId) {
                for (let ind = 0; ind < newCard[0].checklists[index].items.length; ind++) {
                    if (newCard[0].checklists[index].items[ind] && newCard[0].checklists[index].items[ind]._id == itemId) {
                        newCard[0].checklists[index].items.splice(ind, 1)
                    }
                }
            }
        }
        return await Card.findOneAndUpdate({ _id: cardId },
            {
                $set: { checklists: newCard[0].checklists }
            }, { "new": true })
    } catch (error) {
        throw error
    }
}

const updateItem = async (cardId, checklistId, itemId, data) => {
    try {
        const newCard = await Card.find({ "_id": cardId })
        for (let index = 0; index < newCard[0].checklists.length; index++) {
            if (newCard[0].checklists[index]._id == checklistId) {
                for (let ind = 0; ind < newCard[0].checklists[index].items.length; ind++) {
                    if (newCard[0].checklists[index].items[ind] && newCard[0].checklists[index].items[ind]._id == itemId) {
                        Object.assign(newCard[0].checklists[index].items[ind], data)
                    }
                }
            }
        }
        return await Card.findOneAndUpdate({ _id: cardId },
            {
                $set: { checklists: newCard[0].checklists }
            }, { "new": true })
    } catch (error) {
        throw error
    }
}

module.exports = {
    addChecklist,
    deleteChecklist,
    updateChecklist,
    addItem,
    deleteItem,
    updateItem
};
