const express = require('express');
const {getAllActivities, generateData, syncData} = require('../dbImport/spreadsheetsService');

const router = express.Router();

router.get("/getActivitiesItems", getAllActivities);

router.get("/generateData", generateData);

router.get("/syncData", syncData);

module.exports = router;
