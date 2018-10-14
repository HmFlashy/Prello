const CardController = require('../../controllers/cardsController')

module.exports = (req, res) => {
    CardController.getCardById(req).then((data) => {
        res.status(201).json(data)
    }).catch((err) => {
        res.status(err.code).json(err.message)
    })
}