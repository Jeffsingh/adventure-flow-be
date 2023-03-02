const express = require('express')
const userController = require('../controllers/userController')
const {loginSchema, signupSchema} = require("../validation/schema");
const {validateRequest} = require("../validation/validateRequest");
const {signUp, signIn, getUserById} = userController;


const router = express.Router()

router.post('/signup',signupSchema, validateRequest, signUp)

router.post('/login',loginSchema, validateRequest, signIn)

router.get("/:userId", getUserById)

module.exports = router;