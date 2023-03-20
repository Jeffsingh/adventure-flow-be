const Activity = require('../../models').Activity;

const getActivityById = async (id) => {
    return await Activity.findByPk(id, {include: ["items"]});
}

const getActivityByName = async (name) => {
    return await Activity.findOne({where: {name: name}});
}

const getAllActivities = async () => {
    return await Activity.findAll( {include: ["items"]});
}

const createActivity = async (activity) => {
    return await Activity.create(activity);
}

const updateActivityById = async (id, activity) => {
    return await Activity.update(activity, {where: {id}});
}

const deleteActivityById = async (id) => {
    return await Activity.destroy({where: {id}});
}

const checkIfExists = async (field, value) => {
    return await Activity.count({where: {[field]: value}}).then(count => {
            return count !== 0;
        }
    ).catch(err => {
        console.log(err)
        return false;
    })
}

module.exports = {
    getActivityById,
    getAllActivities,
    createActivity,
    updateActivityById,
    deleteActivityById,
    checkIfExists,
    getActivityByName
}