const CardController = require('../../controllers/cardsController')

module.exports = (req, res) => {
    return CardController.getCardById(req.params.id).then((data) => {
        res.status(201).json(data)
    }).catch((err) => {
        res.status(err.code).json(err.message)
    })
}