'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let profile = require('../datas/profile.json').map(el => {
    el.createdAt = el.updatedAt = new Date()
    return el
   })
   let user = require('../datas/user.json').map(el => {
    el.createdAt = el.updatedAt = new Date()
    return el
   })
   await queryInterface.bulkInsert('Users', user)
   await queryInterface.bulkInsert('Profiles', profile)

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Profiles', null)
    await queryInterface.bulkDelete('Users', null)
  }
};
