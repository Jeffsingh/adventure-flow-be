const {getGoogleOauthToken, getGoogleUser, getAuthorizationUri} = require('../security/oauth2/service');
const userService = require('../services/userService');
const User = require('../../models').User;
const authJwt = require('../security/authJwt');
const sendResponse = require('../utils/sendResponse');


const googleOauthHandler = async (req, res) => {
    try {
        const code = req.query.code;
        if (!code) {
            return sendResponse.sendErrorResponse(res, 401, 'Authorization code not provided!', e)
        }
        const {id_token, access_token} = await getGoogleOauthToken({code});

        const {given_name, family_name, verified_email, email, picture} = await getGoogleUser({
            id_token,
            access_token,
        });

        if (!verified_email) {
            return sendResponse.sendErrorResponse(res, 403, 'Google account not verified', e)
        }

        let user = {
            first_name: given_name,
            last_name: family_name,
            email: email
        }
        let token;

        const userRecord = await userService.getUserByEmail(user.email);
        console.log("USER RECORD");
        console.log(userRecord);

        if (!userRecord) {
            console.log("CREATED NEW USER")
            user["role"] = 1;
            user["password"] = "";
            user = await User.create(user);
            console.log(user)

            console.log(user.id);
            console.log(user.email);
            token = authJwt.generateJwtToken(newUser);
        } else {
            console.log("UPDATED USER")
            console.log(userRecord.id);
            await userService.updateUser(userRecord.id, user);
            user = await userService.getUserById(userRecord.id);
            token = authJwt.generateJwtToken(user);
            console.log(user)
            console.log(user.id);
            console.log(user.email);
        }

        if (!user) {
            return sendResponse.sendErrorResponse(res, 500, 'Server error, failed to authorize Google User', e)
        }

        return sendResponse.sendSuccessResponse(res, 200, {
            user: {
                name: user.name,
                id: user.id,
                email: user.email,
                accessToken: token
            },
            publicKey: authJwt.getPublicKey()
        }, 'Login successfully');
    } catch (err) {
        return sendResponse.sendErrorResponse(res, 500, 'Server error, failed to authorize Google User', err)
    }
};

const authorizationPageRedirect = async (req, res) => {
    const url = await getAuthorizationUri();
    console.log("Redirect url: " + url)
    res.redirect(url);
}

module.exports = {googleOauthHandler, authorizationPageRedirect};
