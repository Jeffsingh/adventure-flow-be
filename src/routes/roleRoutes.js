const express = require('express')
const roleController = require('../controllers/roleController')

const router = express.Router()

router.get('/:roleId', roleController.getRoleById)

router.get('/', roleController.getAllRoles)

router.post('/', roleController.createRole)

router.put('/:roleId', roleController.updateRoleById)

router.delete("/:roleId", roleController.deleteRoleById)

module.exports = router;