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

const formatResponse = (openResponse) => {
    openResponse = openResponse.replace(/(?:\r\n|\r|\n)/g, '');
    openResponse = openResponse.replace(".", " ");
    openResponse = openResponse.split(',');
    openResponse = openResponse.filter((item) => item.length > 10);     
    return openResponse.map((item) => item.trim()); 
}; 

const formatQuery = (query, listLength, format, location, activities, month) => { 
    query += "List length - " + listLength + ". "; 
    query += "List format - " + format + ". ";  
    query += "Location - " + location + ". "; 
    query += "Activities types - " + activities + ". ";
    query += "Time of year - " + month + ".";
    return query; 
};; 

const getItineraryItemTips = async (req, res) => {
    const location = req.query.location;
    const month = req.query.month || "March"
    const activities = req.query.activities; 
    const listLength = 10;
    let text = "Create a list of itinerary items for trip. "; 
    requestTemplate = formatQuery(text, listLength, "comma delimited", location, activities, month);  
    try {
        const response = await openaiApiService.generateResponse(requestTemplate, 15000);
        const formattedResponse = formatResponse(response); 
        res.status(200).send(formattedResponse);
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