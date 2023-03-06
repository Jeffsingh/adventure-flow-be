require('dotenv').config();
const userService = require("../services/userService");
const authService = require("../services/authService");

const signUp = async (req, res) => {
    authService.signUp(req, res);
}

const signIn = async (req, res) => {
    authService.signIn(req, res);
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