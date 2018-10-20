const CardController = require('../../controllers/cardsController')
const socketIO = require('../../../socket')

module.exports = async (req, res) => {
    const name = req.body.name;
    try {
        const card = await CardController.addCard(name)
        socketIO.broadcast('action', {
            type: 'ADD_CARD',
            payload: card
        })
        return res.status(200).json(card)
    } catch(error) {
        res.status(500).json(error.message)
    }
}