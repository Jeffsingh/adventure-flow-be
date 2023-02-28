const express = require('express');
const tripController = require("../controllers/tripController")
const {validateRequest} = require('../validation/validateRequest');
const {tripSchema} = require('../validation/schema');

const router = express.Router();

router.get("/:tripId", tripController.getTripById);

router.get("/", tripController.getAllTrips);

router.get("/user/:userId", tripController.getAllTripsByUserId);

router.post("/", tripSchema, validateRequest, tripController.createTrip);

router.put("/:tripId", tripSchema, validateRequest, tripController.updateTripById);

router.delete("/:tripId", tripController.deleteTripById);


module.exports = router;
