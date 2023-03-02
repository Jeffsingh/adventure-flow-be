'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Activity extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({Trip, Item}) {
            this.belongsToMany(Trip, {through: "trips_activities", as: 'trips' ,foreignKey: 'activity_id'})
            this.belongsToMany(Item, {through: 'activities_items', as: 'items', foreignKey: 'activity_id'})

        }
    }

    Activity.init({
        name: {
            type: DataTypes.STRING,
            notNull: true,
            unique: true
        }
    }, {
        sequelize,
        modelName: 'Activity',
        tableName: 'activities'
    });
    return Activity;
};