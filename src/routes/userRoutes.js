const express = require('express')
const userController = require('../controllers/userController')
const {signUp, signIn, getUserById} = userController;
const userService = require("../services/userService");

const router = express.Router()

router.post('/signup',userService.uploadImg, signUp)

router.post('/login', signIn)

router.get("/:userId", getUserById)

module.exports = router;