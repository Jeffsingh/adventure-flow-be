const tripService = require('../services/tripService')
const activityService = require('../services/activityService');
const itemService = require('../services/itemService');
const userService = require('../services/userService');
const itineraryItemService = require('../services/itineraryItemService');

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
                const tripActivity = await activityService.getActivityByName(activity.name);
                await newTrip.addActivity(tripActivity);
            }
        }
        if (body.items) {
            for (let item of body.items) {
                let tripItem;
                if (await itemService.checkIfExists('name', item.name)) {
                    tripItem = await itemService.getItemByName(item.name);
                } else {
                    tripItem = await itemService.createItem({name: item.name, default: false});
                }
                await newTrip.addItem(tripItem);
            }
        }
        if (body.itineraryItems) {
            for (let itineraryItem of body.itineraryItems) {
                await itineraryItemService.createItineraryItem({
                    name: itineraryItem.name,
                    day: itineraryItem.day,
                    trip: newTrip.dataValues.id
                });
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
            await tripService.updateTripById(id, body);
            const tripRecord = await tripService.getTripById(id);

            const newActivities = body.activities?.map(activity => activity.name);
            if (newActivities) {
                const currentActivities = (await activityService.getActivitiesByTrip(tripRecord.dataValues.id)).map(activity => activity.dataValues.name);
                for (let _activity of newActivities) {
                    if (!currentActivities.includes(_activity)) {
                        const activity = await activityService.getActivityByName(_activity);
                        await tripRecord.addActivity(activity);
                    }
                }
                for (let _activity of currentActivities) {
                    if (!newActivities.includes(_activity)) {
                        const activity = await activityService.getActivityByName(_activity);
                        await tripRecord.removeActivity(activity);
                    }
                }
            }

            const newItems = body.items?.map(item => item.name);
            if (newItems) {
                const currentItems = (await itemService.getItemsByTrip(tripRecord.dataValues.id)).map(item => item.dataValues.name);
                for (let _item of newItems) {
                    if (!currentItems.includes(_item)) {
                        let item;
                        if(await itemService.checkIfExists('name',_item)){
                            item = await itemService.getItemByName(_item);
                        } else {
                            item = await itemService.createItem({name: _item});
                        }
                        await tripRecord.addItem(item);
                    }
                }
                for (let _item of currentItems) {
                    if (!newItems.includes(_item)) {
                        const item = await itemService.getItemByName(_item);
                        await tripRecord.removeItem(item);
                        if(!item.dataValues.default){
                           await itemService.deleteItemById(item.dataValues.id);
                        }
                    }
                }
            }

            const newItineraryItems = body.itinerary_items;
            if (newItineraryItems) {
                const currentItineraryItems = (await itineraryItemService.getAllItineraryItemsByTrip(tripRecord.dataValues.id)).map(itineraryItem => itineraryItem.dataValues.name);
                for (let _itineraryItem of newItineraryItems) {
                    if (!currentItineraryItems.includes(_itineraryItem.name)) {
                        await itineraryItemService.createItineraryItem({
                            name: _itineraryItem.name,
                            day: _itineraryItem.day,
                            trip: tripRecord.dataValues.id
                        });
                    }
                }
                const newItineraryItemsName = newItineraryItems.map(item =>item.name);
                for (let _itineraryItem of currentItineraryItems) {
                    if (!newItineraryItemsName.includes(_itineraryItem)) {
                        const itineraryItem = await itineraryItemService.getItineraryItemByName(_itineraryItem);
                        await itineraryItemService.deleteItineraryItemById(itineraryItem.dataValues.id);
                    }
                }
            }

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