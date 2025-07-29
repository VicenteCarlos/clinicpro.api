'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      full_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      phone: {
        type: Sequelize.STRING(20),
      },
      cpf: {
        type: Sequelize.STRING(14),
        allowNull: false,
        unique: true,
      },
      birth_date: {
        type: Sequelize.DATEONLY,
      },
      street: {
        type: Sequelize.STRING(255),
      },
      number: {
        type: Sequelize.STRING(10),
      },
      city: {
        type: Sequelize.STRING(100),
      },
      state: {
        type: Sequelize.STRING(2),
      },
      zip_code: {
        type: Sequelize.STRING(9),
      },
      clinicId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'clinics',
          key: 'id',
        },
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
    await queryInterface.dropTable('patients');
  },
};
