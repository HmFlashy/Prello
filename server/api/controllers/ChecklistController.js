const Card = require('../models/index').Card;
const Checklist = require('../models/index').Checklist;
const Item = require('../models/index').Item;

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
        return newChecklist.checklists
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
        return card.checklists
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
        const card = await Card.findOneAndUpdate({ _id: cardId }, {
            $set: {
                checklists: newCard[0].checklists
            }
        }, { "new": true })
        return card.checklists
    } catch (error) {
        throw error
    }
}

const addItem = async (cardId, checklistId, name) => {
    try {
        const newCard = await Card.find({ "_id": cardId })
        newCard[0].checklists.forEach(checklist => checklist._id == checklistId ? checklist.items.push(new Item({ name })) : checklist)
        newCard[0].cardInformation.nbItems = newCard[0].cardInformation.nbItems + 1
        const card = await Card.findOneAndUpdate({ _id: cardId },
            {
                $set: { checklists: newCard[0].checklists, cardInformation: newCard[0].cardInformation }
            }, { "new": true })
        return card
    } catch (error) {
        throw error
    }
}

const deleteItem = async (cardId, checklistId, itemId) => {
    try {
        let wasChecked
        const newCard = await Card.find({ "_id": cardId })
        for (let index = 0; index < newCard[0].checklists.length; index++) {
            if (newCard[0].checklists[index]._id == checklistId) {
                for (let ind = 0; ind < newCard[0].checklists[index].items.length; ind++) {
                    if (newCard[0].checklists[index].items[ind] && newCard[0].checklists[index].items[ind]._id == itemId) {
                        wasChecked = newCard[0].checklists[index].items[ind].isChecked
                        newCard[0].checklists[index].items.splice(ind, 1)
                    }
                }
            }
        }
        newCard[0].cardInformation.nbItems = newCard[0].cardInformation.nbItems - 1
        if (wasChecked) {
            newCard[0].cardInformation.nbItemsChecked = newCard[0].cardInformation.nbItemsChecked - 1
        }
        const card = await Card.findOneAndUpdate({ _id: cardId },
            {
                $set: { checklists: newCard[0].checklists, cardInformation: newCard[0].cardInformation }
            }, { "new": true })
        return card
    } catch (error) {
        throw error
    }
}

const updateItem = async (cardId, checklistId, itemId, data) => {
    try {
        let newCard = await Card.find({ "_id": cardId })
        newCard = newCard[0]
        for (let index = 0; index < newCard.checklists.length; index++) {
            if (newCard.checklists[index]._id == checklistId) {
                for (let ind = 0; ind < newCard.checklists[index].items.length; ind++) {
                    if (newCard.checklists[index].items[ind] && newCard.checklists[index].items[ind]._id == itemId) {
                        Object.assign(newCard.checklists[index].items[ind], data)
                    }
                }
            }
        }
        if (data.hasOwnProperty('isChecked')) {
            newCard.cardInformation.nbItemsChecked = data.isChecked ? newCard.cardInformation.nbItemsChecked + 1 : newCard.cardInformation.nbItemsChecked - 1
        }
        const card = await Card.findOneAndUpdate({ _id: cardId },
            {
                $set: { checklists: newCard.checklists, cardInformation: newCard.cardInformation }
            }, { "new": true })
        return card
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
