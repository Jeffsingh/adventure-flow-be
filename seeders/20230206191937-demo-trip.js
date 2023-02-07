'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('trips', [
      {
        id: 1,
        name: "Trip_1",
        duration: 5,
        start_date: new Date(),
        created_by: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('trips', null, {});
  }
};
