const UserController = require('../../controllers/UserController')
const throwError = require('../../helper/RequestHelper').throwError;
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10;

const emailRegEx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
/**
  * @swagger
  * definition:
  *   NewList:
  *     properties:
  *       name:
  *         type: string
  *
  * paths:
  *   /cards:
  *     post:
  *       tags:
  *         - Card
  *       description: Create a new card given it's name, creator the list id, the board id and it's position in the list
  *       summary: Creates a new card in the database
  *       requestBody:
  *         description: Optional description in *Markdown*
  *         required: true
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                   required: true
  *                 creator:
  *                   type: ObjectId
  *                   required: true
  *                 listId:
  *                   type: ObjectId
  *                   required: true
  *                 boardId:
  *                   type: ObjectId
  *                   required: true
  *                 pos:
  *                   type: int
  *                   required: true
  *             example: 
  *               name: my super name
  *               creator: 5bce3aaf84c77d0a433029a9
  *               listId: 5bce3aaf84c77d0a433029a9
  *               boardId: 5bce3aaf84c77d0a433029a9
  *               pos: 100000
  *       responses:
  *         200:
  *           description: The created card
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
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !email.match(emailRegEx)) {
            throwError(400, "Bad Request email malformed")
        }
        const user = await UserController.getByEmail(email)
        const veracity = await bcrypt.compare(password, user.password)
        if(veracity == true){
            const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET)
            return res.status(200).json({
                user,
                token
            })
        } else {
            res.sendStatus(401)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}