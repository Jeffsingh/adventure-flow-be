const axios = require('axios');
const qs = require('qs');
const {OAuth2Client} = require('google-auth-library');
const GOOGLE_OAUTH_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const GOOGLE_OAUTH_CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const GOOGLE_OAUTH_REDIRECT = process.env.GOOGLE_OAUTH_REDIRECT;

const oAuth2Client = new OAuth2Client(GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_OAUTH_REDIRECT);
const SCOPES = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'];


const getGoogleOauthToken = async ({code}) => {
    const rootURl = "https://oauth2.googleapis.com/token";
    const options = {
        code,
        client_id: GOOGLE_OAUTH_CLIENT_ID,
        client_secret: GOOGLE_OAUTH_CLIENT_SECRET,
        redirect_uri: GOOGLE_OAUTH_REDIRECT,
        grant_type: "authorization_code",
    };
    try {
        const {data} = await axios.post(rootURl, qs.stringify(options), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        return data;
    } catch (err) {
        console.log("Failed to fetch Google Oauth Tokens");
        throw new Error(err);
    }
};

async function getGoogleUser({id_token, access_token,}) {
    try {
        const {data} = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
            headers: {
                Authorization: `Bearer ${id_token}`,
            },
        });
        return data;
    } catch (err) {
        console.log(err);
        throw Error(err);
    }
}

const getAuthorizationUri = async () => {
    const url =  await oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    return url;
}

module.exports = {getGoogleOauthToken, getGoogleUser, getAuthorizationUri};