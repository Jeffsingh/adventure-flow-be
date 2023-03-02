const express = require('express');
const activityController = require("../controllers/activityController")
const {validateRequest} = require('../validation/validateRequest');
const {activitySchema} = require('../validation/schema');

const router = express.Router();

router.get("/:activityId", activityController.getActivityById);

router.get("/", activityController.getAllActivities);

router.post("/", activitySchema, validateRequest, activityController.createActivity);

router.put("/:activityId",  activitySchema, validateRequest, activityController.updateActivityById);

router.delete("/:activityId", activityController.deleteActivityById);

module.exports = router;
