const openaiApiService = require('../services/openaiApiService');
const itemService = require('../services/itemService');

const getItemById = (req, res) => {
    itemService.getItemById(req.params.itemId)
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
                    err.message || "Some error occurred while retrieving items."
            });
        });
}

const getAllItems = (req, res) => {
    itemService.getAllItems()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving items."
            });
        });
}

const getItemsByActivity = (req, res) => {
    itemService.getItemsByActivity(req.params.activityId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving items."
            });
        });
}

const updateItemById = async (req, res) => {
    const id = req.params.itemId;
    try {
        if (await itemService.checkIfExists(id)) {
            const {body} = req;
            itemService.updateItemById(req.params.itemId, body);
            res.send(("Item with id " + id + " successfully updated"));
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

const createItem = (req, res) => {
    const {body} = req;
    const item = {
        name: body.name,
    }
    itemService.createItem(item)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating item."
            });
        });
}

const deleteItemById = async (req, res) => {
    const id = req.params.itemId;
    try {
        if (await itemService.checkIfExists(id)) {
            itemService.deleteItemById(id)
            res.send("Item with id " + id + " successfully removed");
        } else {
            res.status(302).send({
                message: "Error: record does not exist"
            })
        }
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing item."
        });
    }
}

const getItemTips = async (req, res) => {
    const location = req.query.location;
    const activities = req.query.activities instanceof Array ? req.query.activities.join(", ") : req.query.activities;
    const listLength = 10;
    let requestTemplate = "Create a list of items for trip.List length - " + listLength + ",list format - js array."
    if (location)
        requestTemplate = requestTemplate + " Location - " + location + ".";
    if (activities)
        requestTemplate = requestTemplate + " Activities types - " + activities + ".";

    try {
        res.status(200).send(await openaiApiService.generateResponse(requestTemplate));
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while requesting openai API"
        });
    }
}

module.exports = {
    getItemById,
    getAllItems,
    createItem,
    updateItemById,
    deleteItemById,
    getItemsByActivity,
    getItemTips
}