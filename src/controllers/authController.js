const {getGoogleOauthToken, getGoogleUser, getAuthorizationUri} = require('../security/oauth2/google/service');
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
        let message;

        const userRecord = await userService.getUserByEmail(user.email);
        //TODO image upload

        if (!userRecord) {
            user["role"] = 1;
            user["password"] = "";
            user = await User.create(user);
            token = authJwt.generateJwtToken(user);
            message = 'Successfully created account';
        } else {
            console.log(userRecord.id);
            await userService.updateUser(userRecord.id, user);
            user = await userService.getUserById(userRecord.id);
            token = authJwt.generateJwtToken(user);
            message = 'Login successfully';
        }
        //add redirects // error page
        if (!user) {
            return sendResponse.sendErrorResponse(res, 500, 'Server error, failed to authorize Google User', e)
        }

        //add redirects -- welcome page

        return sendResponse.sendSuccessResponse(res, 200, {
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                accessToken: token
            }
        }, message);
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
