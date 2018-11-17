const CardController = require('../../../controllers/CardsController')
const logger =require('../../../../logger')

/**
  * @swagger
  * definition:
  *   NewList:
  *     properties:
  *       name:
  *         type: string
  *
  * paths:
  *   /cards:
  *     get:
  *       tags:
  *         - Card
  *       description: Fetches all the cards
  *       summary: Fetches all the cards
  *       responses:
  *         200:
  *           description: The corresponding card
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/Card'
  *         500:
  *           description: Internal error
  */
module.exports = (req, res) => {
    return CardController.getCards().then((data) => {
        res.status(200).json(data)
    }).catch((err) => {
        logger.error(err.message)
        res.status(err.code).json(err.message)
    })
}