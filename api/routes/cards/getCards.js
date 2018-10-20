const CardController = require('../../controllers/cardsController')

module.exports = (req, res) => {
    return CardController.getCards().then((data) => {
        res.status(200).json(data)
    }).catch((err) => {
        console.log(err)
        res.status(err.code).json(err.message)
    })
}