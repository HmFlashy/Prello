const CardController = require('../../controllers/CardsController')
const socketIO = require('../../../socket')
const throwError = require('../../helper/RequestHelper').throwError;

const types = {
    name: 'UPDATE_CARD_NAME',
    desc: 'UPDATE_CARD_DESC',
    dueDate: 'UPDATE_CARD_DUEDATE',
    dueDateCompleted: 'UPDATE_CARD_DUEDATE',
    list: 'UPDATE_CARD_LIST',
    board: 'UPDATE_CARD_BOARD',
    pos: 'UPDATE_CARD_POS',
    archive: 'UPDATE_CARD_ISARCHIVED',
}

module.exports = async (req, res) => {
    try {
        const idCard = req.params.idCard
        if (!idCard.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, "Bad Request IdCard malformed")
        }
        if (Object.keys(req.body).length == 0) {
            throwError(400, "No data in body")
        }
        if (cardUpdated = await CardController.updateCard(idCard, req.body)) {
            Object.keys(req.body).forEach(action => {
                if (types[action]) {
                    console.log({
                        type: types[action],
                        payload: cardUpdated[action]
                    })
                    socketIO.broadcast('action', {
                        type: types[action],
                        payload: cardUpdated.action
                    })
                }
            })
            return res.status(200).json(cardUpdated)
        }
        else {
            return res.status(404).json({
                message: `The card ${idCard} does not exist`
            })
        }
    } catch (error) {
        (error.code)
            ? res.status(error.code).json(error.message)
            : res.sendStatus(500);

    }
}