const Activity = require('../../models').Activity;
const Trip = require('../../models').Trip;

const getActivityById = async (id) => {
    return Activity.findByPk(id, {attributes: ['id', 'name']});
}

const getActivityByName = async (name) => {
    return Activity.findOne({where: {name: name}, attributes: ['id', 'name']});
}

const getAllActivities = async () => {
    return Activity.findAll({attributes: ['id', 'name']});
}

const createActivity = async (activity) => {
    return Activity.create(activity);
}

const updateActivityById = async (id, activity) => {
    return Activity.update(activity, {where: {id}});
}

const deleteActivityById = async (id) => {
    return Activity.destroy({where: {id}});
}

const checkIfExists = async (field, value) => {
    return Activity.count({where: {[field]: value}}).then(count => {
            return count !== 0;
        }
    ).catch(err => {
        console.log(err)
        return false;
    })
}

const getActivitiesByTrip = async (tripId) => {
    return Activity.findAll({include: [{model: Trip, as: "trips", where: {id: tripId}}]})
}

module.exports = {
    getActivityById,
    getAllActivities,
    createActivity,
    updateActivityById,
    deleteActivityById,
    checkIfExists,
    getActivityByName,
    getActivitiesByTrip
}