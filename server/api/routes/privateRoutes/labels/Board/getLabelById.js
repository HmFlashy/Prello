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
  *   /boards/:boardId/labels/:labelId:
  *     post:
  *       tags:
  *         - Label
  *       description: Get a label given its Id
  *       summary: Getting a label from the database
  *       responses:
  *         200:
  *           description: Retrieve the label
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
        const boardId = req.params.boardId;
        if(!boardId) {
            throwError(400, 'Missing boardId parameter')
        }
        const labelId = req.params.labelId;
        if(!labelId) {
            throwError(400, 'Missing labelId parameter')
        }
        const label = await LabelsController.getLabelById(labelId)
        if (!label) {
            throwError(400, 'Label not found')
        } else {
            return res.status(200).json(label)
        }
    } catch(error) {
        console.log(error)
        if(error.code){
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}