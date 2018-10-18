const CardController = require('../../controllers/cardsController')

module.exports = (req, res) => {
    console.log(req.params)
    return CardController.getCardById(req.params.idCard).then((data) => {
        res.status(200).json(data)
    }).catch((err) => {
        res.status(404).json(err.message)
    })
}