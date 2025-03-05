'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('PostTags', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
      }
    })
    await queryInterface.addColumn('PostTags', 'TagId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Tags',
        id: 'id'
      }
    })
    await queryInterface.addColumn('PostTags', 'PostId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Posts',
        id: 'id'
      }
    })
    await queryInterface.addColumn('PostTags', 'createdAt', {
      type: Sequelize.DATE,
    })
    await queryInterface.addColumn('PostTags', 'updatedAt', {
      type: Sequelize.DATE,
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('PostTags', 'createdAt')
    await queryInterface.removeColumn('PostTags', 'updatedAt')
    await queryInterface.removeColumn('PostTags', 'PostId')
    await queryInterface.removeColumn('PostTags', 'TagId')
    await queryInterface.dropTable('PostTags')
  }
};
