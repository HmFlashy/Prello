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
  *   /register:
  *     post:
  *       tags:
  *         - Authentification
  *       description: Register to the Prello API
  *       summary: Register to the Prello API by giving credentials
  *       requestBody:
  *         required: true
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 firstname:
  *                   type: string
  *                   required: true
  *                 lastname:
  *                   type: string
  *                   required: true
  *                 pseudo:
  *                   type: string
  *                   required: true
  *                 birthDate:
  *                   type: string
  *                   required: true
  *                 email:
  *                   type: string
  *                   required: true
  *                 password:
  *                   type: string
  *                   required: true
  *                 organization:
  *                   type: string
  *                   required: true
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
        const { firstname, lastname, username, email, password, organization } = req.body
        if(!firstname){
            throwError(400, "Bad Request firstname malformed")
        }
        if(!lastname){
            throwError(400, "Bad Request lastname malformed")
        }
        if(!username || username.length < 4 || username.length > 20){
            throwError(400, "Bad Request username malformed")
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
        const user = await UserController.addUser(firstname, lastname, username, email, password, organization)
        return res.status(201).json(user)
    } catch (error) {
        console.log(error)
        if(error.code){
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}