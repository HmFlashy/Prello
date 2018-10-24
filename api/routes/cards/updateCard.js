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
/**
  * @swagger
  * definition:
  *   NewList:
  *     properties:
  *       name:
  *         type: string
  *
  * paths:
  *   /cards/{cardId}:
  *     put:
  *       tags:
  *         - Card
  *       description: Update attributes of the given card. Attributes can be => name, desc, dueDate, dueDateCompleted, list, board, pos, archive. You can change any number of those fields in one call.
  *       summary: Update attributes of the given card.
  *       parameters:
  *         - name: cardId
  *           schema:
  *             type: string
  *           description: The id of the card to update
  *           in: path
  *           required: true
  *       requestBody:
  *         required: true
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                 desc:
  *                   type: string
  *                 dueDate:
  *                   type: Date
  *                 dueDateCompleted:
  *                   type: Date
  *                 list:
  *                   type: ObjectId
  *                 board:
  *                   type: ObjectId
  *                 pos:
  *                   type: int
  *                 archive:
  *                   type: boolean
  *             example: 
  *               name: my super name
  *               desc: my description
  *               listId: 5bce3aaf84c77d0a433029a9
  *               boardId: 5bce3aaf84c77d0a433029a9
  *               pos: 100000
  *       responses:
  *         200:
  *           description: The updated card
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/Card'
  *         400:
  *           description: The request was malformed.
  *         404:
  *           description: The card was not found.
  *         500:
  *           description: Internal error.
  */
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