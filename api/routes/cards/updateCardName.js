const CardController = require('../../controllers/CardsController')
const socketIO = require('../../../socket')

module.exports = async (req, res) => {
    const idCard = req.params.idCard
    const name = req.body.name
    try {
        const cardUpdated = await CardController.updateCardName(idCard, name)
        console.log(cardUpdated)
        if(cardUpdated) {
            socketIO.broadcast('action', {
                type: 'UPDATE_CARD_NAME',
                payload: cardUpdated
            })
            return res.status(200).json(cardUpdated)
        } else {
            return res.status(404).json({
                message: `The card ${idCard} does not exist`
            })
        }
    } catch(error) {
        return res.status(500).json(error.message)
    }
}