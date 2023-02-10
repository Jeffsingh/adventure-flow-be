const express = require('express');
const activityController = require("../controllers/activityController")

const router = express.Router();

router.get("/:activityId", activityController.getActivityById);

router.get("/", activityController.getAllActivities);

router.post("/", activityController.createActivity);

router.put("/:activityId", activityController.updateActivityById);

router.delete("/:activityId", activityController.deleteActivityById);

module.exports = router;
