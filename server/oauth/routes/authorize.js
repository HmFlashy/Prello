const getUser = require('../server/model').getUser
const oauth = require('../server/OAuth2Server')

module.exports = (req, res, next) => {
    const options = {
        authenticateHandler: {
            handle: async (data) => {
                const email = req.body.username
                const password = req.body.password
                const user = await getUser(email, password)
                console.log("mdr")
                return user;
            }
        }
    }
    // Include options to override
    oauth.authorize(options)(req, res, next).then(code => console.log(code));
}