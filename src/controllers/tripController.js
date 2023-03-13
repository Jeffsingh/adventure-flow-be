const tripService = require('../services/tripService')
const activityService = require('../services/activityService');
const typeService = require('../services/typeService');
const itemService = require('../services/itemService');
const userService = require('../services/userService');

const getTripById = (req, res) => {
    tripService.getTripById(req.params.tripId)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(302).send({
                    message: "Error: record does not exist"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving trip."
            });
        });

}

const getAllTrips = (req, res) => {
    tripService.getAllTrips()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving trips."
            });
        });
}

const createTrip = async (req, res) => {
    const {body} = req;
    console.log(body)

    const trip = {
        name: body.name,
        start_date: body.start_date,
        duration: body.duration,
        location: body.location,
        created_by: body.created_by
    }
    try {
        const newTrip = await tripService.createTrip(trip);
        if (body.activities) {
            for (let activity of body.activities) {
                const tripActivity = await activityService.getActivityById(activity.id);
                await newTrip.addActivity(tripActivity);
            }
        }
        if(body.items){
            for(let item of body.items){
                const tripItem = await itemService.getItemById(item.id);
                await newTrip.addItem(tripItem);
            }
        }
        tripService.getTripById(newTrip.dataValues.uuid).then(data => {
            res.send(data);
        })
    } catch
        (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating trip."
        });
    }

}

const updateTripById = async (req, res) => {
    try {
        let id = req.params.tripId;
        if (await tripService.checkIfExists(id)) {
            const {body} = req;
            tripService.updateTripById(id, body);
            res.send(("Trip with id " + id + " successfully updated"));
        } else {
            res.status(302).send({
                message: "Error: record does not exist"
            })
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while updating trip."
        });
    }
}

const deleteTripById = async (req, res) => {
    try {
        let id = req.params.tripId;
        if (await tripService.checkIfExists(id)) {
            tripService.deleteTripById(req.params.tripId)
            res.send("Trip with id " + req.params.tripId + " successfully removed");
        } else {
            res.status(302).send({
                message: "Error: record does not exist"
            })
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while removing trip."
        });
    }
}

const getAllTripsByUserId = async (req, res) => {
    const user = await userService.getUserById(req.params.userId);
    if (user) {
        tripService.getAllTripsByUserId(user.id)
            .then(data => {
                if (data) {
                    res.send(data);
                } else {
                    res.status(302).send({
                        message: "Error: record does not exist"
                    })
                }
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving trip."
                });
            });
    } else {
        res.status(302).send({
            message: "Error: user does not exist"
        })
    }
}

module.exports = {
    getTripById,
    getAllTrips,
    createTrip,
    updateTripById,
    deleteTripById,
    getAllTripsByUserId
}