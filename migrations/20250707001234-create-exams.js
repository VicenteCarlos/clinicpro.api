'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('exams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        field: 'exam_name',
      },
      type: {
        type: Sequelize.STRING(100),
        allowNull: false,
        field: 'exam_type',
      },
      category: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      request_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      observations: {
        type: Sequelize.TEXT,
      },
      results: {
        type: Sequelize.JSONB,
        defaultValue: [],
      },
      status: {
        type: Sequelize.STRING(50),
        defaultValue: 'pending',
      },
      notes: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('exams');
  },
};
