const express = require('express');
const {getAllActivities, generateData} = require('../dbImport/spreadsheetsService');

const router = express.Router();


router.get("/getActivitiesItems", getAllActivities);

router.get("/generateData", generateData);

module.exports = router;
