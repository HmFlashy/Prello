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
        const newLabel = await Board.findOneAndUpdate({ _id: boardId },
            {
                $push: {
                    labels: new Label({
                        name: name,
                        color: color
                    })
                }
            }, { "new": true })
        return newLabel.labels
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

const updateLabel = async (boardId, labelId, name, color) => {
    try {
        const newBoard = await Board.find({ "_id": boardId })
        for (let index = 0; index < newBoard[0].labels.length; index++) {
            if (newBoard[0].labels[index]._id == labelId) {
                newBoard[0].labels[index].name = name,
                newBoard[0].labels[index].color = color
            }
        }
        const board = await Board.findOneAndUpdate({ _id: boardId }, {
            $set: {
                labels: newBoard[0].labels
            }
        }, { "new": true })
        return board.labels
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

