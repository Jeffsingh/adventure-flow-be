const Activity = require('../../models').Activity;

const getActivityById = (id) => {
    return Activity.findByPk(id);
}

const getAllActivities = () => {
    return Activity.findAll();
}

const createActivity = (activity) => {
    return Activity.create(activity);
}

const updateActivityById = (id, activity) => {
    return Activity.update(activity, {where: {id}});
}

const deleteActivityById = (id) => {
    return Activity.destroy({where: {id}});
}

const checkIfExists = (id) => {
    return Activity.count({where: {id: id}}).then(count => {
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
    checkIfExists
}