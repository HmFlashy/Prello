const UserController = require('../../../controllers/UserController')
const throwError = require('../../../helper/RequestHelper').throwError
const { validationResult } = require('express-validator/check');

/**
 * @swagger
 * definition:
 *   NewList:
 *     properties:
 *       name:
 *         type: string
 *
 * paths:
 *   /me:
 *     put:
 *       tags:
 *         - User
 *       description: Change the user's profile info
 *       summary: Change the user's profile info
 *       responses:
 *         200:
 *           description: The updated user
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const userId = req.user._id.toString();
        if (!userId) {
            throwError(400, 'Missing userId parameter')
        } else if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The userId ${userId} is malformed`)
        }
        console.log(userId)
        const { bio, email, fullName, organization, username } = req.body
        const user = await UserController.updateUser(userId, fullName, username, email, bio, organization, req.body.newPassword && req.body.newPassword.length > 8 ? req.body.newPassword : undefined);
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        if (error.code) {
            res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}