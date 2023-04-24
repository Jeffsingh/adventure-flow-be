require('dotenv').config();
const userService = require("../services/userService");
const authService = require("../services/authService");
const {User} = require("../../models");
const tripService = require("../services/tripService");
const path = require("path");

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

const removeUserById = async (req, res) => {
    try {
        let id = req.params.userId;
        if (await userService.checkIfExists(id)) {
            userService.deleteUserById(req.params.userId)
            res.send("User with id " + req.params.userId + " successfully removed");
        } else {
            res.status(302).send({
                message: "Error: record does not exist"
            })
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while removing user."
        });
    }
}

const imageUpload = async (req, res) => {
console.log("Started uploading file");
    const userId = req.params.userId;
    try {
        console.log("Still working on files");

        const user = await userService.getUserById(userId);
        const ext = path.extname(req.file.originalname);
        user.imageUrl = '/images/users/' + userId + '_profile' + ext;
        await user.save();
        res.send("Imaged uploaded for user:" + userId);
    } catch (err) {
        console.log("Error during image upload for user:" + userId + "Error:" + err);
    }
}

module.exports = {
    signUp,
    signIn,
    getUserById,
    removeUserById,
    imageUpload
};