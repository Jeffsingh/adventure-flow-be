const express = require('express');
const itemController = require("../controllers/itemController")

const router = express.Router();

router.get("/:itemId", itemController.getItemById);

router.get("/", itemController.getAllItems);

router.post("/", itemController.createItem);

router.put("/:itemId", itemController.updateItemById);

router.delete("/:itemId", itemController.deleteItemById);


module.exports = router;
