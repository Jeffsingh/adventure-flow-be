const User = require('../../models').User;

const getUserById = (id) => {
    return User.findOne({where: {id: id}});
}

const getUserByEmail = (email) => {
    return User.findOne({where: {email: email}});
}

const updateUser = (id, user) => {
    return User.update(user, {where: {id}});
}

const checkIfExists = (value) => {
    return User.count({where: {id: value}}).then(count => {
            return count !== 0;
        }
    ).catch(err => {
        console.log(err)
        return false;
    })
}

module.exports = {
    getUserById,
    checkIfExists,
    getUserByEmail,
    updateUser
};