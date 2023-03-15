'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('trips', [
      {
        id: 1,
        uuid: "31c9f93a-0cf2-41c7-a70b-336b19cd4307",
        name: "Trip_1",
        duration: 5,
        location: "location_name",
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
