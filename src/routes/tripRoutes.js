const express = require('express');
const tripController = require("../controllers/tripController")

const router = express.Router();

router.get("/:tripId", tripController.getTripById);

router.get("/", tripController.getAllTrips);

router.get("/user/:userId", tripController.getAllTripsByUserId);

router.post("/", tripController.createTrip);

router.put("/:tripId", tripController.updateTripById);

router.delete("/:tripId", tripController.deleteTripById);


module.exports = router;
