'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('professionals', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      crm: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      specialty: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      clinicId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clinics', 
          key: 'id',
        },
     
      },
      working_hours: {
        type: Sequelize.JSONB,
        allowNull: true,
        comment: 'Formato: { monday: { start: "08:00", end: "17:00" }, ... }',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('professionals');
  }
};
