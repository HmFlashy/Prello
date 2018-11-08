const LabelsController = require('../../../../controllers/LabelsController')
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
  *   /boards/:boardId/labels:
  *     post:
  *       tags:
  *         - Label
  *       description: Creating a new label for a board given its name, color and the board Id
  *       summary: Creating a label in the database
  *       requestBody:
  *         required: true
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                   required: true
  *                 color:
  *                   type: string
  *                   required: true
  *             example: 
  *               name: my super name
  *               color: my super color
  *       responses:
  *         200:
  *           description: The updated Board
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/Board'
  *         400:
  *           description: The request was malformed
  *         500:
  *           description: Internal error
  */
module.exports = async (req, res) => {
    try {
        const name = req.body.name;
        const color = req.body.color;
        const boardId = req.params.boardId;
        if (!boardId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The boardId ${boardId} is malformed`)
        }
        if (Object.keys(req.body).length === 0) {
            throwError(400, "No data in body")
        }
        if (!name) {
            throwError(400, "Missing name parameter")
        }
        if (!color) {
            throwError(400, "Missing color parameter")
        }
        const label = await LabelsController.createLabel(name, color, boardId)
        socketIO.broadcast('action', boardId,{
            type: 'CREATED_LABEL',
            payload: { boardId: boardId, label }
        })
        return res.status(200).json(label)
    } catch (error) {
        res.status(500).json(error.message)
    }
}