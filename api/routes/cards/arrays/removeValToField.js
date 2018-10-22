const CardController = require('../../../controllers/CardsController')
const socketIO = require('../../../../socket')
const throwError = require('../../../helper/RequestHelper').throwError;


const fields = {
    "labels": "REMOVE_CARD_LABEL",
    "comments": "REMOVE_CARD_COMMENT",
    "members": "REMOVE_CARD_MEMBER",
    "attachments": "REMOVE_CARD_ATTACHMENT",
    "watchers": "REMOVE_CARD_WATCHER",
}


module.exports = async (req, res) => {
    try {
        const idCard = req.params.idCard
        if (!idCard.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, "Bad Request IdCard malformed")
        }
        if (fields[req.params.field]) {
            const card = await CardController.removeToArray(req.params.idCard, req.params.field, req.body.payload)
            socketIO.broadcast('action', {
                type: fields[req.params.field],
                payload: req.body.label
            })
            return res.status(200).json(card)
        }
        else {
            throwError(400, "Bad Request unknown field")
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}