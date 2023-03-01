'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('trips_items', [
      {
        trip_id: 1,
        item_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        trip_id: 1,
        item_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('trips_items', null, {});
  }
};
