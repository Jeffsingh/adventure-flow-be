'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('activities', [
      {
        id: 1,
        name: "activity_1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "activity_2",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('activities', null, {});
  }
};
