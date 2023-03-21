const express = require('express');
const itemController = require("../controllers/itemController")
const {validateRequest} = require('../validation/validateRequest');
const {itemSchema} = require('../validation/schema');

const router = express.Router();

router.get("/item/:itemId", itemController.getItemById);

router.get('/activities', itemController.getItemsByActivities)

router.get("/", itemController.getAllItems);

router.get("/activity/:activityId", itemController.getItemsByActivity);

router.post("/", itemSchema, validateRequest, itemController.createItem);

router.put("/:itemId", itemSchema, validateRequest, itemController.updateItemById);

router.delete("/:itemId", itemController.deleteItemById);

router.get("/tips/search", itemController.getItemTips);



module.exports = router;
