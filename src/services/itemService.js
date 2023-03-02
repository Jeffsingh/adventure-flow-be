const {Activity} = require("../../models");
const Item = require('../../models').Item;

const getItemById = (id) => {
    return Item.findByPk(id);
}

const getAllItems = () => {
    return Item.findAll();
}

const getItemsByActivity = (activityId) => {
    return Item.findAll({include: [{model: Activity, as:"activities", through: {where: {activity_id: activityId}}}]});
}

const createItem = (item) => {
    return Item.create(item);
}

const updateItemById = (id, item) => {
    return Item.update(item, {where: {id}});
}

const deleteItemById = (id) => {
    return Item.destroy({where: {id}});
}

const checkIfExists = (id) => {
    return Item.count({where: {id: id}}).then(count => {
            return count !== 0;
        }
    ).catch(err => {
        console.log(err)
        return false;
    })
}

module.exports = {
    getItemById,
    getAllItems,
    createItem,
    updateItemById,
    deleteItemById,
    checkIfExists,
    getItemsByActivity
}