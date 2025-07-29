'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('medical_records', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      patient_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'patients',
          key: 'id',
        },
      },
      professional_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'professionals',
          key: 'id',
        },
      },
      appointment_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'queries',
          key: 'id',
        },
      },
      record_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      record_type: {
        type: Sequelize.ENUM('consultation', 'exam', 'procedure', 'prescription', 'emergency'),
        allowNull: false,
      },
      specialty: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      chief_complaint: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      history_of_present_illness: {
        type: Sequelize.TEXT,
      },
      physical_examination: {
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
      notes: {
        type: Sequelize.TEXT,
      },
      attachments: {
        type: Sequelize.JSON,
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
    await queryInterface.dropTable('medical_records');
  },
}; 