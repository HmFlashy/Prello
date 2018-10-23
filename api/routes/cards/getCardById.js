const CardController = require('../../controllers/CardsController')

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
  *     get:
  *       tags:
  *         - Card
  *       description: Fetches the card with the specified Id
  *       summary: Fetches the card with the specified Id
  *       parameters:
  *         - name: cardId
  *           schema:
  *             type: string
  *           description: The id of the card to fetch
  *           in: path
  *           required: true
  *       responses:
  *         200:
  *           description: All the cards
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/Card'
  *         400:
  *           description: The request was malformed
  *         500:
  *           description: Internal error
  */
module.exports = (req, res) => {
    console.log(req.params)
    return CardController.getCardById(req.params.idCard).then((data) => {
        res.status(200).json(data)
    }).catch((err) => {
        res.status(404).json(err.message)
    })
}