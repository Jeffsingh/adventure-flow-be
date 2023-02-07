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
    static associate({Activity}) {
      this.belongsToMany(Activity, {through: 'activities_items', as: 'items', foreignKey: 'item_id'})
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