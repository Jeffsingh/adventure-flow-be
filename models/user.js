'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({Role, Trip}) {
            this.hasOne(Role, {as: 'roles', foreignKey: 'id'})
            this.hasOne(Trip, {foreignKey:'created_by'})
        }
    }

    User.init({
        first_Name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_Name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull:false
        }
    }, {
        sequelize,
        tableName: 'users',
        modelName: 'User',
    });
    return User;
};