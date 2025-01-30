'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Messages', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      sender_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      receiver_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      group_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      reply_to_message_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      file_url: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      filename: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      file_type: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      file_size: {
        type: Sequelize.JSONB,
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
    await queryInterface.addIndex('Messages', {
      fields: ['id'],
      unique: true,
      name: 'Messages_pkey'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Messages');
  }
};
