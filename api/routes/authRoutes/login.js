const UserController = require('../../controllers/UserController')
const throwError = require('../../helper/RequestHelper').throwError;
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10;

const emailRegEx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
/**
  * @swagger
  * paths:
  *   /register:
  *     post:
  *       tags:
  *         - Authentification
  *       description: Register to the Prello API
  *       summary: Register to the Prello API by giving credentials
  *       requestBody:
  *         description: Optional description in *Markdown*
  *         required: true
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 email:
  *                   type: string
  *                   required: true
  *                 password:
  *                   type: ObjectId
  *                   required: true
  *             example: 
  *               email: exemple@host.com
  *               password: myPassword
  *       responses:
  *         200:
  *           description: The user and the token
  *           content:
  *             application/json:
  *               schema:
  *                 type: object
  *                 properties:
  *                   user:
  *                     type: object
  *                     $ref: '#components/schemas/User'
  *                   token:
  *                     type: string
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
        console.log(user)
        const veracity = await bcrypt.compare(password, user.hash)
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