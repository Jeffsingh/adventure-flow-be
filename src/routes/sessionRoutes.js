const express = require('express')
const {googleOauthHandler, authorizationPageRedirect} = require('../controllers/authController');


const router = express.Router()

router.get('/oauth/google', googleOauthHandler)

router.get('/google/redirect', authorizationPageRedirect)


module.exports = router;