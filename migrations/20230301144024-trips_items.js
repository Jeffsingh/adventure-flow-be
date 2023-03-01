'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.createTable('trips_items', {
      trip_id: {
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      item_id: {
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.dropTable('trips_items');
  }
};
