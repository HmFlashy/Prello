const getUser = require('../server/model').getUser
const oauth = require('../server/OAuth2Server')

module.exports = async (req, res, next) => {
    const options = {
        authenticateHandler: {
            handle: async (data) => {
                const email = req.body.username
                const password = req.body.password
                try {
                    return await getUser(email, password)
                } catch(error) {
                    throw error
                }
            }
        }
    }
    oauth.authorize(options)(req, res, next)
}