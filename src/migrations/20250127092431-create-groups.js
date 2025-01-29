'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Groups', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      group_name: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      user_ids: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      admin_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      profile_image: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Add index for the primary key
    await queryInterface.addIndex('Groups', {
      fields: ['id'],
      unique: true,
      name: 'Groups_pkey'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Groups');
  }
};
