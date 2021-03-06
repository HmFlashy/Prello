const CardController = require('../../../../controllers/CardsController')
const UserController = require('../../../../controllers/UserController')
const socketIO = require('../../../../../socket/index')
const throwError = require('../../../../helper/RequestHelper').throwError;
const logger = require('../../../../../logger')


const fields = {
    "labels": "ADD_CARD_LABEL",
    "comments": "ADD_CARD_COMMENT",
    "members": "ADD_CARD_MEMBER",
    "attachments": "ADD_CARD_ATTACHMENT",
    "watchers": "ADD_CARD_WATCHER",
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
  *     post:
  *       tags:
  *         - Card
  *       description: Add an element to a field. The supported fields are => labels, comments, members, attachments, watchers. The body must be composed of a json with the field as key and the value to add to the array as value (ObjectId). 
  *       summary: Add an element to a field.
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
  *           description: The field you want to add a value to. Can be => labels, comments, members, attachments, watchers
  *           in: path
  *           required: true 
  *       requestBody:
  *         description: Holds the value you want to add, the key refers to the field.
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
            const card = await CardController.addToArray(idCard, req.params.field, req.body.payload)
            if (req.params.field === "members") {
                const user = await UserController.getById(req.body.payload)
                socketIO.broadcast('action', card.board, {
                    type: fields[req.params.field],
                    payload: {
                        _id: idCard,
                        [req.params.field]: user
                    }
                })
                return res.status(200).json(card)
            }
            else {
                socketIO.broadcast('action', card.board, {
                    type: fields[req.params.field],
                    payload: {
                        _id: idCard,
                        [req.params.field]: req.body.payload
                    }
                })
                return res.status(200).json(card)
            }
        }
        else {
            throwError(400, "Bad Request unknown field")
        }
    } catch (error) {
        logger.error(error.message)
        res.status(500).json(error.message)
    }
}