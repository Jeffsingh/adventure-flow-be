const tripService = require('../services/tripService')

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

const createTrip = (req, res) => {
    const {body} = req;
    console.log(body)

    const trip = {
        name: body.name,
        start_date: body.start_date,
        duration: body.duration,
        created_by: body.created_by
    }
    console.log(trip)
    tripService.createTrip(trip)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating trip."
            });
        });
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

module.exports = {
    getTripById,
    getAllTrips,
    createTrip,
    updateTripById,
    deleteTripById
}