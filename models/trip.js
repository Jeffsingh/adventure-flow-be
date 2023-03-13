'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Trip extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({User, Activity, Type, Item}) {
            this.hasOne(User, {foreignKey: 'id'});
            this.belongsToMany(Activity, {foreignKey: 'trip_id',as:'activities', through: 'trips_activities'});
            this.belongsToMany(Type, {foreignKey: 'trip_id', as: 'types', through: 'trips_types'})
            this.belongsToMany(Item, {foreignKey: 'trip_id', as: 'items', through: 'trips_items'})
        }
    }

    Trip.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Trip',
        tableName: 'trips'
    });
    return Trip;
};