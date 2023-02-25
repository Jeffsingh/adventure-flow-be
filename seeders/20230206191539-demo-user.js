'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        email: "admin@mail.com",
        password: "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
        role: "1",
        image_url:"uploads\\default_user.png",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
