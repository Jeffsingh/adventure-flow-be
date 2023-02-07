const Role = require('../../models').Role;

const getRoleById = (id) => {
    return Role.findByPk(id);
}

const getAllRoles = () => {
    return Role.findAll();
}

const createRole = (role) => {
    return Role.create(role);
}

const updateRoleById = async (id, role) => {
    const roleRecord = await Role.findByPk(id);
    roleRecord.name = role.name;
    return roleRecord.save();
}

const deleteRoleById = async (id) => {
    const role = await Role.findByPk(id);
    return role.destroy();
}

module.exports = {
    getRoleById,
    getAllRoles,
    createRole,
    updateRoleById,
    deleteRoleById
}