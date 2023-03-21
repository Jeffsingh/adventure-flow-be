const ItineraryItem = require('../../models').Itinerary_item;

const getItineraryItemById = (id) => {
    return ItineraryItem.findByPk(id);
}

const getAllItineraryItems = () => {
    return ItineraryItem.findAll();
}

const createItineraryItem = (itineraryItem) => {
    return ItineraryItem.create(itineraryItem);
}

const updateItineraryItemById = (id, itineraryItem) => {
    return ItineraryItem.update(itineraryItem, {where: {id}});
}

const deleteItineraryItemById = (id) => {
    return ItineraryItem.destroy({where: {id}});
}

const getAllItineraryItemsByTrip = (tripId) => {
    return ItineraryItem.findAll({where: {trip: tripId}});
}

const checkIfExists = (id) => {
    return ItineraryItem.count({where: {id: id}}).then(count => {
            return count !== 0;
        }
    ).catch(err => {
        console.log(err)
        return false;
    })
}

module.exports = {
    getItineraryItemById,
    getAllItineraryItems,
    createItineraryItem,
    updateItineraryItemById,
    deleteItineraryItemById,
    checkIfExists
}