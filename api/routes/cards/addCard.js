const CardController = require('../../controllers/CardsController')
const socketIO = require('../../../socket')
const throwError = require('../../helper/RequestHelper').throwError;


module.exports = async (req, res) => {
    try {
        const name = req.body.name;
        const listId = req.body.listId;
        if (!listId || !listId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, "Bad Request listId malformed")
        }
        const card = await CardController.addCard(name, listId)
        socketIO.broadcast('action', {
            type: 'ADD_CARD',
            payload: card
        })
        return res.status(200).json(card)
    } catch (error) {
        res.status(500).json(error.message)
    }
}