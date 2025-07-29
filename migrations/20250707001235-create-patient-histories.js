'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('patient_histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      record_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      record_type: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      specialty: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      main_complaint: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      current_disease_history: {
        type: Sequelize.TEXT,
      },
      physical_exam: {
        type: Sequelize.TEXT,
      },
      diagnosis: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      treatment: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      follow_up: {
        type: Sequelize.TEXT,
      },
      observations: {
        type: Sequelize.TEXT,
      },
      queryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'queries',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      professionalId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'professionals',
          key: 'id',
        },
      },
      patientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'patients',
          key: 'id',
        },
      },
      clinicId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('patient_histories');
  },
};
