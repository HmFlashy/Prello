const Board = require('../models').Board;
const Label = require('../models').Label;


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
        await Board.findOneAndUpdate({ _id: boardId },
            { $push: { labels: savedLabel } }, { "new": true })
        return savedLabel
    } catch (error) {
        throw error
    }
}

const deleteLabel = async (boardId, labelId) => {
    try {
        const board = await Board.findOneAndUpdate({ _id: boardId },
            {
                $pull: { labels: { _id: labelId } }
            }, { "new": true })
        return board.labels
    } catch (error) {
        throw error
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

