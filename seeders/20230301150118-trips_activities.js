'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('trips_activities', [
      {
        trip_id: 1,
        activity_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        trip_id: 1,
        activity_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('trips_activities', null, {});
  }
};
