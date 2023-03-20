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

const formatResponse = (openResponse) => {
    openResponse = openResponse.replace(/(?:\r\n|\r|\n)/g, '');
    openResponse = openResponse.replace(".", " ");
    openResponse = openResponse.split(',');   
    return openResponse.map((item) => item.trim()); 
}; 

const getRecommendedActivitiesByLocation = async (req, res) => {
    
    const location = req.query.location || "";
    //const activities = req.query.activities instanceof Array ? req.query.activities.join(", ") : req.query.activities;
    const activities = "vacation, outdoor"
    const listLength = 12;
    const month = req.query.month || "March"
    const query = "Create an unnumbered list of itinerary items for trip. "; 
    requestTemplate = query; 
    requestTemplate += "List length - " + listLength + ". "; 
    requestTemplate += "List format - comma delimited. ";  
    requestTemplate += "Location - " + location + ". "; 
    requestTemplate += "Activities types - " + activities + ". ";
    requestTemplate += "Time of year - " + month + ".";

    console.log("requesting", requestTemplate);
    let openResponse = null; 
    try {
        openResponse = await openaiApiService.generateResponse(requestTemplate); 
        openResponse = formatResponse(openResponse); 
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