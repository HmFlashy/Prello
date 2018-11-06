const Board = require('../models').Board;
const Label = require('../models').Label;
const Card = require('../models').Card;
const BoardsController = require('./BoardsController')
const mongoose = require('mongoose');
const throwError = require('../helper/RequestHelper').throwError;



const getLabelById = async (id) => {
    try {
        const label = await Label.findById(id)
        return label
    } catch (error) {
        throw error
    }
};

const createLabel = async (name, color, boardId) => {
    try {
        const label = new Label({
            name: name,
            color: color,
            board: boardId
        });
        const savedLabel= await label.save()
        await BoardsController.addLabel(boardId, savedLabel)
        return savedLabel
    } catch (error) {
        throw error
    }
}

const deleteLabel = async (boardId, labelId) => {
    let session = null
    try {
        session = await mongoose.startSession()
        session.startTransaction();
        const label = await Label.findById(labelId)
        if(!label) {
            throwError(404, `The label ${labelId} was not found`)
        }
        await BoardsController.removeLabel(boardId,labelId);    
        await session.commitTransaction();
        session.endSession();
        return await label.remove();
    } catch (error) {
        console.log(error)
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
}


const updateLabel = async (labelId, data) => {
    try {
        return await Label.findOneAndUpdate({ _id: labelId }, { $set: data }, { "new": true })
    } catch (error) {
        throw error
    }
}


module.exports = {
    getLabelById,
    createLabel,
    deleteLabel,
    updateLabel
};
