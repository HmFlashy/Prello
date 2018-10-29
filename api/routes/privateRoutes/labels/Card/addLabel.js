const LabelController = require('../../../controllers/LabelController')
const socketIO = require('../../../../../socket')
const throwError = require('../../../../helper/RequestHelper').throwError;

/**
  * @swagger
  * definition:
  *   NewList:
  *     properties:
  *       name:
  *         type: string
  *
  * paths:
  *   /cards/:cardId/labels:
  *     post:
  *       tags:
  *         - Label
  *       description: Adding a label to a card given its name and the card Id
  *       summary: Adding the label in the card's list of labels in the database
  *       requestBody:
  *         description: Optional description in *Markdown*
  *         required: true
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                   required: true
  *             example: 
  *               name: my super name
  *       responses:
  *         200:
  *           description: The added label
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
        const name = req.body.name;
        const cardId = req.params.cardId;
        if (!cardId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The cardId ${cardId} is malformed`)
        }
        if (Object.keys(req.body).length === 0) {
            throwError(400, "No data in body")
        }
        if (!name) {
            throwError(400, "Missing name parameter")
        }
        const labels = await LabelController.addLabel(name, cardId)
        socketIO.broadcast('action', {
            type: 'ADDED_LABEL',
            payload: { _id: cardId, labels }
        })
        return res.status(200).json(labels)
    } catch (error) {
        res.status(500).json(error.message)
    }
}