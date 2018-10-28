const jwt = require('jsonwebtoken')
const UserController = require('../controllers/UserController')

module.exports = (req, res, next) => {
    const token = req.token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if(err){
            console.log(err)
        } else {
            try {
                req.user = await UserController.getByEmail(decoded.email)
                console.log(req.user)
                next()
            } catch(error) {
                console.log(error)
            }
        }
    })
}