const CardController = require('../../../controllers/CardsController')
const socketIO = require('../../../../socket/index')
const logger =require('../../../../logger')

const types = {
    name: 'UPDATE_CARD_NAME',
    desc: 'UPDATE_CARD_DESC',
    dueDate: 'UPDATE_CARD_DUEDATE',
    dueDateCompleted: 'UPDATE_CARD_DUEDATECOMPLETED',
    isArchived: 'UPDATE_CARD_ISARCHIVED',
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
  *       description: Update attributes of the given card. Attributes can be => name, desc, dueDate, dueDateCompleted, archive. You can change any number of those fields in one call.
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
  *                 archive:
  *                   type: boolean
  *             example: 
  *               name: my super name
  *               desc: my description
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
        const cardId = req.params.cardId
        if (cardUpdated = await CardController.updateCard(cardId, req.body)) {
            Object.keys(req.body).forEach(action => {
                if (types[action]) {
                    socketIO.broadcast('action', cardUpdated.board, {
                        type: types[action],
                        payload: { [action]: cardUpdated[action], "_id": cardUpdated._id }
                    })
                }
            })
            return res.status(200).json({
                type: "Success",
                message: "Card found",
                data: cardUpdated
            })
        }
        else {
            return res.status(404).json({
                type: "Error",
                message: `The card ${idCard} does not exist`
            })
        }
    } catch (error) {
        logger.error(error.message)
        (error.code)
            ? res.status(error.code).json(error.message)
            : res.sendStatus(500);

    }
}