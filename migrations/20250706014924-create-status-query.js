'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('queries', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'aguardando',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('queries', 'status');
  },
};
