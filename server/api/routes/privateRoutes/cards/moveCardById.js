const CardController = require('../../../controllers/CardsController')
const throwError = require('../../../helper/RequestHelper').throwError;
const socketIO = require('../../../../socket/index');

/**
  * @swagger
  * definition:
  *   NewList:
  *     properties:
  *       name:
  *         type: string
  *
  * paths:
  *   /cards/{cardId}/move:
  *     get:
  *       tags:
  *         - Card
  *       description: Move the card from one list to the other
  *       summary: Move the card from one list to the other
  *       parameters:
  *         - name: cardId
  *           schema:
  *             type: string
  *           description: The id of the card to fetch
  *           in: path
  *           required: true
  *       responses:
  *         200:
  *           description: Move the card
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/Card'
  *         400:
  *           description: The request was malformed
  *         500:
  *           description: Internal error
  */
module.exports = async (req, res) => {
    try {
        const cardId = req.params.cardId;
        if (!cardId || !cardId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, "Bad Request cardId malformed")
        }
        const oldListId = req.body.oldListId
        if (!oldListId || !oldListId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, "Bad Request oldListId malformed")
        }
        const newListId = req.body.newListId
        if (!newListId || !newListId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, "Bad Request newListId malformed")
        }
        const pos = req.body.pos
        if (!pos && pos !== 0) {
            throwError(400, "Bad Request pos malformed")
        }
        const result = await CardController.moveCard(cardId, newListId, pos);
        socketIO.broadcast('action', result[1].board, {
            type: 'MOVED_CARD',
            payload: {
                oldListId: oldListId,
                newListId: newListId,
                pos: pos,
                _id: result[1]._id,
                boardId: result[1].board,
                listName: result[0].name
            }
        });
        return res.status(200).json(result[1])
    } catch (error) {
        console.log(error)
        if (error.code) {
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}