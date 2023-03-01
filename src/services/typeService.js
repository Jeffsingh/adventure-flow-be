const Type = require('../../models').Type;

const getTypeById = (id) => {
    return Type.findByPk(id);
}

const getAllTypes = () => {
    return Type.findAll();
}

const createType = (type) => {
    return Type.create(type);
}

const updateTypeById = async (id, type) => {
    const typeRecord = await Type.findByPk(id);
    typeRecord.name = type.name;
    return typeRecord.save();
}

const deleteTypeById = async (id) => {
    const type = await Type.findByPk(id);
    return type.destroy();
}

module.exports = {
    getTypeById,
    getAllTypes,
    createType,
    updateTypeById,
    deleteTypeById
}