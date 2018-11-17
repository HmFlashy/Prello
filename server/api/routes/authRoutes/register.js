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
            throwError(400, "MISSING_FIRSTNAME")
        }
        const trimedFirstname = firstname.trim()
        if(!lastname){
            throwError(400, "MISSING_LASTNAME")
        }
        const trimedLastname = lastname.trim()
        if(!username) {
            throwError(400, "MISSING_USERNAME")
        }
        const trimedUsername = username.trim()
        if(trimedUsername.length < 4 || trimedUsername.length > 20){
            throwError(400, "USERNAME_MALFORMED")
        }
        if (!email) { 
            throwError(400, "MISSING_EMAIL")
        }
        const trimedEmail = email.trim().toLowerCase()
        if(!trimedEmail.match(emailRegEx)) {
            throwError(400, "EMAIL_MALFORMED")
        }
        if (!password) {
            throwError(400, "MISSING_PASSWORD")
        }
        const trimedPassword = password.trim()
        if(!trimedPassword.match(passwordRegex)) {
            throwError(400, "PASSWORD_MALFORMED")
        }
        if(!organization){
            throwError(400, "MISSING_ORGANIZATION")
        }
        const trimedOrganization = organization.trim()
        const user = await UserController.addUser(trimedFirstname, trimedLastname, trimedUsername, trimedEmail, trimedPassword, trimedOrganization)
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