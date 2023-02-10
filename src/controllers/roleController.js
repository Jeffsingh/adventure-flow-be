const roleService = require('../services/roleService')

const getRoleById = (req, res) => {
    const role = roleService.getRoleById(req.params.roleId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving role."
            });
        });

}

const getAllRoles = (req, res) => {
    roleService.getAllRoles()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving roles."
            });
        });
}

const createRole = (req, res) => {
    const {body} = req;
    const role = {
        name: body.name,
    }
    console.log(role)
    roleService.createRole(role)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating role"
            });
        });
}

const updateRoleById = (req, res) => {
    res.send()
}

const deleteRoleById = (req, res) => {
    res.send()
}

module.exports = {
    getRoleById,
    getAllRoles,
    createRole,
    updateRoleById,
    deleteRoleById
}