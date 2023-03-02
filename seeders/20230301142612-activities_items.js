'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('activities_items', [
      {
        activity_id: 1,
        item_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        activity_id: 2,
        item_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('activities_items', null, {});
  }
};
