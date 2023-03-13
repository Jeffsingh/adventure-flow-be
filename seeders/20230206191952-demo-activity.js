'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('activities', [
      {
        id: 1,
        name: "Hiking",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "Camping",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: "Beach vacation",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: "Road trip",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: "Cultural immersion",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        name: "Adventure travel",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        name: "Wellness retreat",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        name: "Ski or snowboarding trip",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        name: "Food and wine tour",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        name: "Wildlife safari",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        name: "City break",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        name: "Island hopping",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        name: "Ecotourism",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        name: "Cruise",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        name: "Historical exploration",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 16,
        name: "Volunteer trip",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 17,
        name: "Photography tour",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 18,
        name: "Yoga retreat",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 19,
        name: "Music festival",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 20,
        name: "Scuba diving or snorkeling trip",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 21,
        name: "Backpacking trip",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 22,
        name: "Spa getaway",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('activities', null, {});
  }
};
