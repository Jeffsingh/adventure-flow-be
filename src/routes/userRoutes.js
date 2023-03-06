const express = require('express')
const userController = require('../controllers/userController')
const {loginSchema, signupSchema} = require("../validation/schema");
const {validateRequest} = require("../validation/validateRequest");
const authJwt = require('../security/authJwt');
const {Type} = require("../../models");
const {signUp, signIn, getUserById, removeUserById} = userController;
const User = require('../../models').User;


const router = express.Router()

router.post('/signup', signupSchema, validateRequest, signUp)

router.post('/login', loginSchema, validateRequest, signIn)

router.get("/:userId", authJwt.verifyToken, authJwt.verifyUserId, getUserById)

router.delete("/:userId", removeUserById)

module.exports = router;