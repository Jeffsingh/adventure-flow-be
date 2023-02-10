const express = require('express')
const userController = require('../controllers/userController')
const {signUp, signIn, getUserById} = userController

const router = express.Router()

router.post('/signup', signUp)

router.post('/login', signIn)

router.get("/:userId", getUserById)

module.exports = router;