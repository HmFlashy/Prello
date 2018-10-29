const UserController = require('../../controllers/UserController')
const throwError = require('../../helper/RequestHelper').throwError;
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10;

const emailRegEx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const passwordRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

/**
  * @swagger
  * paths:
  *   /login:
  *     post:
  *       tags:
  *         - Authentification
  *       description: Connect to the prello API by getting a valid token and the current user information
  *       summary: Connect to the prello API
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
        const { firstname, lastname, pseudo, email, password, organization } = req.body
        if(!firstname){
            throwError(400, "Bad Request firstname malformed")
        }
        if(!lastname){
            throwError(400, "Bad Request lastname malformed")
        }
        if(!pseudo || pseudo.length < 4 || pseudo.length > 20){
            throwError(400, "Bad Request pseudo malformed")
        }
        if (!email || !email.match(emailRegEx)) {
            throwError(400, "Bad Request email malformed")
        }
        if (!password || !password.match(passwordRegex)) {
            throwError(400, "Bad Request password malformed")
        }
        if(!organization){
            throwError(400, "Bad Request organization malformed")
        }
        const hash = await bcrypt.hash(password, saltRounds)
        const user = await UserController.addUser(firstname, lastname, pseudo, email, hash, organization)
        return res.send(201).json(user)
    } catch (error) {
        res.status(error.code).json(error.message)
    }
}