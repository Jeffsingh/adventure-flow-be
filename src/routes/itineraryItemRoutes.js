const express = require('express');
const itineraryItemController = require("../controllers/itineraryItemController")

const router = express.Router();

router.get("/:itineraryItemId", itineraryItemController.getItineraryItemById);

router.get("/", itineraryItemController.getAllItineraryItems);

router.post("/", itineraryItemController.createItineraryItem);

router.put("/:itineraryItemId", itineraryItemController.updateItineraryItemById);

router.delete("/:itineraryItemId", itineraryItemController.deleteItineraryItemById);

router.get('/tips/search', itineraryItemController.getItineraryItemTips);


module.exports = router;
