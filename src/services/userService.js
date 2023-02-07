const sendResponse = require("../utils/sendResponse");
const hashing = require("../utils/hashing")
const User = require("../../models").User;
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
    const {email, password, name} = req.body;
    try {
        let user = await User.findOne({where: {email}});
        if (user) {
            return sendResponse.sendErrorResponse(res, 422, 'User with that email already exists');
        }

        user = await User.create({
            name,
            email,
            password: hashing.hash(password)
        });
        let token = jwt.sign({id: user.id}, process.env.SEKRET_KEY, {
            expiresIn: 86400 // 24 hours
        });

        return sendResponse.sendSuccessResponse(res, 201, {
            user: {
                name: user.name,
                email: user.email,
                accessToken: token
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

        if (!user) return sendErrorResponse(res, 404, 'Incorrect login credentials');
        const checkPassword = hashing.hash_compare(hashing.hash(password), user.password);
        if (!checkPassword) {
            return sendErrorResponse(res, 400, 'Incorrect login credentials');
        }

        let token = jwt.sign({id: user.id}, process.env.SEKRET_KEY, {
            expiresIn: 86400 // 24 hours
        });

        return sendResponse.sendSuccessResponse(res, 200, {
            user: {
                name: user.name,
                id: user.id,
                email: user.email,
                accessToken: token
            },
        }, 'Login successfully');
    } catch (e) {
        console.error(e);
        return sendResponse.sendErrorResponse(res, 500, 'Server error, contact admin to resolve issue', e);
    }
}

const getUserById = (id) => {
    return User.findOne({where: {id: id}, include: "roles"});
}


module.exports = {
    signUp,
    signIn,
    getUserById
};