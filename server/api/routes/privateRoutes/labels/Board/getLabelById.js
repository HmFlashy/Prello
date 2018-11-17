const LabelsController = require('../../../../controllers/LabelsController')
const logger = require('../../../../../logger')

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
        const labelId = req.params.labelId;
        const label = await LabelsController.getLabelById(labelId)
    } catch (error) {
        logger.error(error.message)
        if (error.code) {
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}