'use strict';

let md5 = require('md5')
  const now = new Date()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [
      {
        firstname: "nopal",
        lastname: "ganteng",
        password: md5("12345"),
        role: "admin",
        createdAt: now,
        updatedAt: now
      },
      {
        firstname: "panji",
        lastname: "petualang",
        password: md5("12345"),
        role: "user",
        createdAt: now,
        updatedAt: now
      },
      {
        firstname: "agus",
        lastname: "rendang",
        password: md5("12345"),
        role: "user",
        createdAt: now,
        updatedAt: now
      }
    ])

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});

  }
};
