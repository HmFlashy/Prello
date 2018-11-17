const CardController = require("../../../controllers/CardsController")
const ListController = require("../../../controllers/ListsController")
const socketIO = require("../../../../socket/index")
const throwError = require("../../../helper/RequestHelper").throwError;
const { validationResult } = require('express-validator/check');
const S3 = require("../../../S3Service.js")
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
 *   /cards/:cardId/attachments:
 *     post:
 *       tags:
 *         - Card
 *       description: Add an attachment to the card, can receive either a file or the data for said file
 *       summary: Add an attachment to the card
 *       responses:
 *         200:
 *           description: The new attachments
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#components/schemas/Card'
 *         400:
 *           description: The request was malformed
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        if (req.get('content-type').includes("multipart/form-data"))
            S3.s3Upload.single('file')(req, res, (err, data) => {
                if (err)
                    res.status(500).send("Internal error")
                else {
                    const name = req.file.key;
                    const owner = req.user._id.toString();
                    const url = req.file.location;
                    const cardId = req.params.cardId;
                    CardController.addAttachment(name, owner, cardId, url)
                        .then(result => {
                            socketIO.broadcast("action", result[1].board, {
                                type: "ADD_CARD_ATTACHMENT",
                                payload: { _id: cardId, attachment: result[0] }
                            });
                            res.status(200).send(result[1])
                        })
                }
            })
        else {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const name = req.body.name;
            const owner = req.user._id.toString();
            const url = req.body.url;
            const cardId = req.params.cardId;
            result = await CardController.addAttachment(name, owner, cardId, url)
            socketIO.broadcast("action", result[1].board, {
                type: "ADD_CARD_ATTACHMENT",
                payload: { _id: cardId, attachment: result[0] }
            });
            res.status(200).send(result[1])
        }

    } catch (error) {
        logger.error(error.message)
        if (error.code) {
            res.status(error.code).json(error.message);
        } else {
            res.sendStatus(500);
        }
    }
}