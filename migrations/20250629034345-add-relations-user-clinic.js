'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'clinicId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'clinics',
        key: 'id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'clinicId');
  },
};
