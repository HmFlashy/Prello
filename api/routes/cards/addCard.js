const CardController = require('../../controllers/cardsController')

module.exports = (req, res) => {
    const name = req.body.name;
    return CardController.addCard(name).then((data) => {
        res.status(200).json(data)
    }).catch((err) => {
        res.status(err.code).json(err.message)
    })
}