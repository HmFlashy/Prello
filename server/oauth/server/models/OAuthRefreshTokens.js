var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const OAuthRefreshToken = new Schema({
    refreshToken: String,
    refreshTokenExpiresAt: Date,
    scope: String,
    client: String,
    user: { type: Schema.Types.ObjectId, ref: 'OAuthUser' },
});

const OAuthRefreshTokens = mongoose.model('OAuthRefreshTokens', OAuthRefreshToken);

OAuthRefreshTokens.getRefreshToken = async (refreshToken) => {
    return await OAuthRefreshTokens.findOne({ refreshToken: refreshToken });
};

OAuthRefreshTokens.revokeToken = async (token) => {
    const refreshToken = await OAuthRefreshToken.findOne({refreshToken: token.refreshToken})
    if(refreshToken){
        await refreshToken.destroy()
        return true
    } else {
        return false
    }
}

module.exports = OAuthRefreshTokens
