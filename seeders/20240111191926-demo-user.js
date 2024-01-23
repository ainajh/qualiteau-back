"use strict";

/** @type {import('sequelize-cli').Migration} */

const utils = require("../utils");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "JH",
          lastName: "Aina",
          email: "ainajh11@gmail.com",
          status: true,
          address: "Fianarantsoa",
          entreprise: "CampusWave",
          role: "admin",
          login: "ainajh11",
          password: await utils.hashPasword("Ainajh11@"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "John",
          lastName: "Doe",
          email: "johndoe@example.com",
          status: true,
          address: "New York",
          entreprise: "Tech Solutions",
          role: "ingenieur",
          login: "johndoe",
          password: await utils.hashPasword("JohnDoe123@"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Alice",
          lastName: "Smith",
          email: "alicesmith@example.com",
          status: true,
          address: "San Francisco",
          entreprise: "Innovate Corp",
          role: "manager",
          login: "alicesmith",
          password: await utils.hashPasword("AliceSmith456@"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Bob",
          lastName: "Johnson",
          email: "bobjohnson@example.com",
          status: true,
          address: "Los Angeles",
          entreprise: "Tech Innovations",
          role: "collaborator",
          login: "bobjohnson",
          password: await utils.hashPasword("BobJohnson789@"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { validate: false }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
