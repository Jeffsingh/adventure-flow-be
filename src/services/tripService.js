const Trip = require('../../models').Trip;

const getTripById = (id) => {
    return Trip.findByPk(id);
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
    checkIfExists
}