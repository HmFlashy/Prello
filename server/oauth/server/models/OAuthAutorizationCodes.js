
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const logger = require('../../../logger')

const OAuthAuthorizationCode = new Schema({
    authorizationCode: String,
    expiresAt: Date,
    redirectUri: String,
    scope: String,
    client: Object,
    user: { type: Schema.Types.ObjectId, ref: 'OAuthUser' }
})


const OAuthAuthorizationCodes = mongoose.model('OAuthAuthorizationCodes', OAuthAuthorizationCode);

OAuthAuthorizationCodes.getAuthorizationCode = async (authorizationCode) => {
    try {
        const code = await OAuthAuthorizationCodes.findOne({ authorizationCode: authorizationCode })
        return code
    } catch(error) {
        logger.error(error.message)
        throw error
    }
}

OAuthAuthorizationCodes.revokeAuthorizationCode = async (code) => {
    await code.remove()
    return true
}

OAuthAuthorizationCodes.saveAuthorizationCode = async (code, client, user) => {
    const authorizationCode = new OAuthAuthorizationCodes({
        ...code,
        client: {
            id: client.id
        },
        user: user
    })
    return await authorizationCode.save()
}

module.exports = OAuthAuthorizationCodes
