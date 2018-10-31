
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const OAuthAuthorizationCode = new Schema({
    code: String,
    expiresAt: Date,
    redirectUri: String,
    scope: String,
    client: { type: Schema.Types.ObjectId, ref: 'OAuthClient' },
    user: { type: Schema.Types.ObjectId, ref: 'OAuthUser' }
})


const OAuthAuthorizationCodes = mongoose.model('OAuthAuthorizationCodes', OAuthAuthorizationCode);

OAuthAuthorizationCodes.getAuthorizationCode = (authorizationCode, callback) => {
    return OAuthAuthorizationCodes.findOne({ code: authorizationCode })
}

OAuthAuthorizationCodes.revokeAuthorizationCode = async (code) => {
    const authorizationCode = await OAuthAuthorizationCodes.findOne({code: code.code})
    if(authorizationCode){
        await authorizationCode.destroy()
        return true
    } else {
        return false
    }
}

module.exports = OAuthAuthorizationCodes
