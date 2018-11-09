const UserController = require('../../controllers/UserController')
const throwError = require('../../helper/RequestHelper').throwError;
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const request = require('request-promise')


const emailRegEx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
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
        const email = req.body.email;
        const password = req.body.password;
        /*if (!email || !email.match(emailRegEx)) {
            throwError(400, "EMAIL_MALFORMED")
        }*/
        if(!password){
            throwError(400, "PASSWORD_EMPTY")
        }
        const options = {
            method: 'POST',
            uri: `${process.env.URL_OAUTH}/oauth/token`,
            form: {
                username: email,
                password: password,
                scope: "read write",
                grant_type: 'password',
                ldap: req.body.ldap ? req.body.ldap : "false",
                section: req.body.section,
                year: req.body.year
            },
            headers: {
                'User-Agent': 'Request-Promise',
                "content-type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + Buffer.from(`${process.env.OAUTH_CLIENTID_PRELLO}:${process.env.OAUTH_SECRET_PRELLO}`).toString('base64')
            },
            json: true
        }
        const token = await request(options).catch(error => throwError(400, error.response.body.error_description))
        return res.status(200).json({
            token: token.access_token
        })
    } catch (error) {
        console.log(error)
        return res.status(error.code).send(error.message)
    }
}