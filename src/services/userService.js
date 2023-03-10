const {Type} = require("../../models");
const User = require('../../models').User;

const getUserById = (id) => {
    return User.findOne({where: {uuid: id}});
}

const getUserByEmail = (email) => {
    return User.findOne({where: {email: email}});
}

const updateUser = (id, user) => {
    return User.update(user, {where: {uuid:id}});
}

const checkIfExists = (value) => {
    return User.count({where: {uuid: value}}).then(count => {
            return count !== 0;
        }
    ).catch(err => {
        console.log(err)
        return false;
    })
}

const deleteUserById = async (id) => {
    const user = await User.findByPk({where: {uuid: id}});
    return user.destroy();
}

module.exports = {
    getUserById,
    checkIfExists,
    getUserByEmail,
    updateUser,
    deleteUserById
};