const fs = require('fs');
const sendResponse = require('../utils/sendResponse');
const hashing = require('../utils/hashing')
const authJwt = require('../security/authJwt')
const User = require('../../models').User;


const signUp = async (req, res) => {
    const {first_name, last_name, email, password} = req.body;
    try {
        let user = await User.findOne({where: {email}});
        if (user) {
            return sendResponse.sendErrorResponse(res, 422, 'User with that email already exists');
        }

        user = await User.create({
            first_name,
            last_name,
            email,
            password: hashing.hash(password),
            role: 1,
            imageUrl: '/images/users/default.png'
        });
        let token = authJwt.generateJwtToken(user);

        return sendResponse.sendSuccessResponse(res, 201, {
            user: {
                id: user.uuid,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                accessToken: token,
            }
        }, 'Account created successfully');
    } catch (e) {
        console.error(e);
        return sendResponse.sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.', e)
    }
}

const signIn = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({where: {email: email}});

        if (!user) return sendResponse.sendErrorResponse(res, 404, 'Incorrect login credentials');
        const checkPassword = hashing.hash_compare(hashing.hash(password), user.password);
        if (!checkPassword) {
            return sendResponse.sendErrorResponse(res, 400, 'Incorrect login credentials');
        }

        let token = authJwt.generateJwtToken(user);

        return sendResponse.sendSuccessResponse(res, 200, {
            user: {
                id: user.uuid,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                accessToken: token
            }
        }, 'Login successfully');
    } catch (e) {
        console.error(e);
        return sendResponse.sendErrorResponse(res, 500, 'Server error, contact admin to resolve issue', e);
    }
}


module.exports = {
    signUp,
    signIn
};