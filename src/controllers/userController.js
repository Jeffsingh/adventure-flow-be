const jwt = require("jsonwebtoken");
require('dotenv').config();
const userService = require("../services/userService");
const User = require("../../models").User;

const signUp = async (req, res) => {
    userService.signUp(req, res);
}

const signIn = async (req, res) => {
    userService.signIn(req, res);
}

const getUserById = async (req, res) => {
    userService.getUserById(req.params.userId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving user by id."
            });
        });
}

module.exports = {
    signUp,
    signIn,
    getUserById
};