
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
    const code = await OAuthAuthorizationCodes.findOne({ authorizationCode: authorizationCode })
    return code
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
