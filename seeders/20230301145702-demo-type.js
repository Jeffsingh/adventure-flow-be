'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('types', [
      {
        id: 1,
        name: "type_1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "type_2",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('types', null, {});
  }
};
