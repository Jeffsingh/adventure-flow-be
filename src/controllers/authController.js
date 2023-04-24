const axios = require('axios');
const {getGoogleOauthToken, getGoogleUser, getAuthorizationUri} = require('../security/oauth2/google/service');
const userService = require('../services/userService');
const User = require('../../models').User;
const authJwt = require('../security/authJwt');
const sendResponse = require('../utils/sendResponse');
const fs = require('fs');


const path = require('path');
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
            email,
            role: 1,
            password: "",
        };
        const userRecord = await userService.getUserByEmail(user.email);
        let message, imagePath;

        if (!userRecord) {
            user = await User.create(user);
            message = 'Successfully created account';
        } else {
            await userService.updateUser(userRecord.dataValues.uuid, user);
            user = await userService.getUserById(userRecord.dataValues.uuid);
            message = 'Login successfully';
        }

        if (picture) {
            console.log("picture")
            console.log(picture)
            const fileName = `${user.uuid}_profile.jpg`;
            imagePath = await saveImage(picture, fileName);
        }

        user.imageUrl = imagePath;
        await user.save();
        const token = authJwt.generateJwtToken(user);

        res.redirect(`/?token=${token}&userId=${user.uuid}`);
    } catch (err) {
        return sendResponse.sendErrorResponse(res, 500, 'Server error, failed to authorize Google User', err)
    }

};
const authorizationPageRedirect = async (req, res) => {
    const url = await getAuthorizationUri();
    console.log("Redirect url: " + url)
    res.redirect(url);


}

const saveImage = async (imageUrl, fileName) => {
    try {
        const response = await axios({
            url: imageUrl,
            method: 'GET',
            responseType: 'stream'
        });
        const directoryPath = path.join(__dirname, '../../public/images/users');
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }
        const imagePath = path.join(directoryPath, fileName);
        const imageStream = response.data.pipe(fs.createWriteStream(imagePath));
        return new Promise((resolve, reject) => {
            imageStream.on('finish', () => {
                resolve(`/images/users/${fileName}`);
            });
            imageStream.on('error', (err) => {
                reject(err);
            });
        });
    } catch (err) {
        throw err;
    }
};

module.exports = {googleOauthHandler, authorizationPageRedirect};
