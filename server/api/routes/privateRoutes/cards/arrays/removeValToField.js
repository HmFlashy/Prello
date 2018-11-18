const CardController = require('../../../../controllers/CardsController')
const socketIO = require('../../../../../socket/index')
const throwError = require('../../../../helper/RequestHelper').throwError;
const logger = require('../../../../../logger')


const fields = {
    "labels": "REMOVE_CARD_LABEL",
    "comments": "REMOVE_CARD_COMMENT",
    "members": "REMOVE_CARD_MEMBER",
    "attachments": "REMOVE_CARD_ATTACHMENT",
    "watchers": "REMOVE_CARD_WATCHER",
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
  *   /cards/{idCard}/field/{field}:
  *     delete:
  *       tags:
  *         - Card
  *       description: Remove an element from a field. The supported fields are => labels, comments, members, attachments, watchers. The body must be composed of a json with the field as key and the value to remove from the array as value (ObjectId). 
  *       summary: Remove an element from a field.
  *       parameters:
  *         - name: cardId
  *           schema:
  *             type: string
  *           description: The id of the card.
  *           in: path
  *           required: true
  *         - name: field
  *           schema:
  *             type: string
  *           description: The field you want to remove a value from. Can be => labels, comments, members, attachments, watchers
  *           in: path
  *           required: true 
  *       requestBody:
  *         description: Holds the value you want to remove, the key refers to the field.
  *         required: true
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 labels:
  *                   type: ObjectId
  *             example: 
  *               labels: 5bce3aaf84c77d0a433029a9
  *       responses:
  *         200:
  *           description: The updated card
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/Card'
  *         400:
  *           description: The request was malformed.
  *         500:
  *           description: Internal error.
  */
module.exports = async (req, res) => {
    try {
        const idCard = req.params.cardId
        if (fields[req.params.field]) {
            const card = await CardController.removeToArray(idCard, req.params.field, req.params.value)
            socketIO.broadcast('action', card.board, {
                type: fields[req.params.field],
                payload: {
                    _id: idCard,
                    [req.params.field]: req.params.value
                }
            })
            return res.status(200).json(card)
        }
        else {
            throwError(400, "Bad Request unknown field")
        }
    } catch (error) {
        logger.error(error.messag)
        res.status(500).json(error.message)
    }
}