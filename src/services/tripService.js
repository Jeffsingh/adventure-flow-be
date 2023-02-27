const Trip = require('../../models').Trip;

const getTripById = (id) => {
    return Trip.findOne({where: {id:id}, include: "activities"});
}

const getAllTrips = () => {
    return Trip.findAll();
}

const createTrip =  (trip) => {
    return Trip.create(trip);
}

const updateTripById = (id, trip) => {
    return Trip.update(trip, {where: {id}});
}

const deleteTripById = (id) => {
    return Trip.destroy({where: {id}});
}

const getAllTripsByUserId = (userId) => {
    return Trip.findAll({where:{created_by:userId}, include: "activities"});
}

const checkIfExists = (id) => {
    return Trip.count({where: {id: id}}).then(count => {
            return count !== 0;
        }
    ).catch(err => {
        console.log(err)
        return false;
    })
}

module.exports = {
    getTripById,
    getAllTrips,
    createTrip,
    updateTripById,
    deleteTripById,
    checkIfExists,
    getAllTripsByUserId
}