'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class itinerary_items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Trip}) {
      this.hasOne(Trip, {foreignKey: 'id'})
    }
  }
  itinerary_items.init({
    name: {
      type: DataTypes.STRING,
      notNull: true,
    },
    day: {
      type: DataTypes.INTEGER,
      notNull: true,
      defaultValue: 0
    }
    }, {
    sequelize,
    modelName: 'Itinerary_item',
    tableName: 'itinerary_items'
  });
  return itinerary_items;
};