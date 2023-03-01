'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Activity, Trip}) {
      this.belongsToMany(Activity, {foreignKey: 'item_id', as: 'activities', through: 'activities_items'});
      this.belongsToMany(Trip, {foreignKey: 'item_id', as: 'trips', through: 'trips_items'})
    }
  }
  Item.init({
    name: {
      type: DataTypes.STRING,
      notNull: true,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Item',
    tableName: 'items'
  });
  return Item;
};