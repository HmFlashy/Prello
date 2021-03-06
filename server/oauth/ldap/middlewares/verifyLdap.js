const OAuthUsers = require('../../server/models/OAuthUsers')
const ldapClient = require('../client')
const UserController = require('../../../api/controllers/UserController')
const logger = require('../../../logger')

module.exports = async (req, res, next) => {
    try {
        if(req.body.ldap == "true"){
            const name = req.body.username
            const password = req.body.password
            const section = req.body.section
            const year = req.body.year
            const ldapUser = await ldapClient.search(name, password, section, year)
            let user = await OAuthUsers.findOne({ ldapId: ldapUser[0].employeeID[0] })
            if(!user){
                let user = await OAuthUsers.find({ username: new RegExp(`/^${name}/`)})
                const username = user.length > 0 ? `${name}${user.length + 10}` : name
                const firstname = name.split('.')[0]
                const lastname = name.split('.')[1]
                await UserController.addUser(firstname, lastname, username, ldapUser[0].mail[0], password, "Polytech", ldapUser[0].employeeID[0])
            }
        }
        next()
    } catch(error) {
        logger.error(error.message)
        const message = 
            error.name === "LDAPError" ? "LDAP_SERVER_ERROR" :
            null
        return res.status(400).send(message)
    }
}