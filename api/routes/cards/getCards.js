const CardController = require('../../controllers/cardsController')

module.exports = (req, res) => {
    CardController.getCards().then((data) => {
        res.status(200).json(data)
    }).catch((err) => {
        res.status(err.code).json(err.message)
    })
}