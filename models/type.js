'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    static associate({Trip}) {
      this.belongsToMany(Trip, {foreignKey: 'type_id', as: 'trips', through: 'trips_types'})
    }
  }
  Type.init({
    name: {
      type: DataTypes.STRING,
      notNull: true,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Type',
    tableName: 'types'
  });
  return Type;
};