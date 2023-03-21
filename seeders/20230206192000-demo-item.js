'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('items', [
            {
                id: 1,
                name: "item_1",
                default: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 2,
                name: "item_2",
                default: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('items', null, {});
    }
};
