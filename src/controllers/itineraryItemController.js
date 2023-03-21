const itineraryItemService = require('../services/itineraryItemService')
const openaiApiService = require("../services/openaiApiService");

const getItineraryItemById = (req, res) => {
    itineraryItemService.getItineraryItemById(req.params.itineraryItemId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving itinerary item."
            });
        });

}

const getAllItineraryItems = (req, res) => {
    itineraryItemService.getAllItineraryItems()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving itinerary items."
            });
        });
}

const createItineraryItem = (req, res) => {
    const {body} = req;
    const itineraryItem = {
        name: body.name,
        day: body.day,
        trip: body.trip
    }
    console.log(itineraryItem)
    itineraryItemService.createItineraryItem(itineraryItem)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating itineraryItem"
            });
        });
}

const updateItineraryItemById = async (req, res) => {
    const id = req.params.itineraryItemId;
    try {
        if (await itineraryItemService.checkIfExists(id)) {
            const {body} = req;
            itineraryItemService.updateItineraryItemById(req.params.itemId, body);
            res.send(("Itinerary item with id " + id + " successfully updated"));
        } else {
            res.status(302).send({
                message: "Error: record does not exist"
            })
        }
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while updating item."
        });
    }
}

const deleteItineraryItemById = async (req, res) => {
    const id = req.params.itineraryItemId;
    try {
        if (await itineraryItemService.checkIfExists(id)) {
            await itineraryItemService.deleteItineraryItemById(id)
            res.send("Itinerary item with id " + id + " successfully removed");
        } else {
            res.status(302).send({
                message: "Error: record does not exist"
            })
        }
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing itinerary item."
        });
    }
}

const getItineraryItemTips = async (req, res) => {
    const location = req.query.location;
    const activities = req.query.activities instanceof Array ? req.query.activities.join(", ") : req.query.activities;
    const date = req.query.startDate;
    const listLength = 10;
    let requestTemplate = "Create a list of itinerary items for trip.List length - " + listLength + ",list format - js array."
    if (location)
        requestTemplate = requestTemplate + " Location - " + location + ".";
    if (activities)
        requestTemplate = requestTemplate + " Activities types - " + activities + ".";
    // if(date)
    //     requestTemplate = requestTemplate + " Start date - " + date + ".";

    try {
        const response = await openaiApiService.generateResponse(requestTemplate, 15000);
        res.status(200).send(JSON.parse(openaiApiService.parseResponseArray(response, false)));
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while requesting openai API"
        });
    }
}

module.exports = {
    getItineraryItemById,
    getAllItineraryItems,
    createItineraryItem,
    updateItineraryItemById,
    deleteItineraryItemById,
    getItineraryItemTips
}