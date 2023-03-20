const activityService = require('../services/activityService')
const openaiApiService = require("../services/openaiApiService");

const getActivityById = (req, res) => {
    activityService.getActivityById(req.params.activityId)
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
                message: err.message || "Some error occurred while retrieving activity."
            });
        });

}

const getAllActivities = (req, res) => {
    activityService.getAllActivities()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving activities."
            });
        });
}

const createActivity = (req, res) => {
    const {body} = req;
    console.log(body)

    const activity = {
        name: body.name
    }
    console.log(activity)
    activityService.createActivity(activity)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating activity."
            });
        });
}

const updateActivityById = async (req, res) => {
    try {
        let id = req.params.activityId;
        if (await activityService.checkIfExists(id)) {
            const {body} = req;
            activityService.updateActivityById(id, body);
            res.send(("Activity with id " + id + " successfully updated"));
        } else {
            res.status(302).send({
                message: "Error: record does not exist"
            })
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while updating activity."
        });
    }
}

const deleteActivityById = async (req, res) => {
    try {
        const id = req.params.activityId;
        if (await activityService.checkIfExists(id)) {
            activityService.deleteActivityById(id);
            res.send("Activity with id " + id + " successfully removed");
        } else {
            res.status(302).send({
                message: "Error: record does not exist"
            })
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while updating activity."
        });
    }
}

const getRecommendedActivitiesByLocation = async (req, res) => {
    
    const location = req.query.location;
    const activities = req.query.activities instanceof Array ? req.query.activities.join(", ") : req.query.activities;
    const listLength = 10;
    let requestTemplate = "Create a list of activities for trip.List length - " + listLength + ",list format - js array."
    if (location)
        requestTemplate = requestTemplate + " Location - " + location + ".";
    if (activities)
        requestTemplate = requestTemplate + " Activities types - " + activities + ".";

    let openResponse = null; 
    try {
        openResponse = await openaiApiService.generateResponse(requestTemplate)
    } catch(err) {
        res.status(500).send({
            message: "Our api service failed: " + err.message
        });
        return; 
    } 
    
    res.status(200).send(openResponse);
 
}

module.exports = {
    getActivityById,
    getAllActivities,
    createActivity,
    updateActivityById,
    deleteActivityById,
    getRecommendedActivitiesByLocation
}