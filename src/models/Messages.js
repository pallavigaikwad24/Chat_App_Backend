const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Messages = sequelize.define('Messages', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    reply_to_message_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    file_url: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    filename: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    file_type: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    file_size: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'Messages',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Messages_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

  Messages.associate = (models) => {
    // One-to-one relationship for sender
    Messages.belongsTo(models.Users, {
      foreignKey: 'sender_id',
      as: 'Sender',
    });

    // One-to-one relationship for receiver
    Messages.belongsTo(models.Users, {
      foreignKey: 'receiver_id',
      as: 'Receiver',
    });

    // One-to-one relationship for receiver
    Messages.belongsTo(models.Groups, {
      foreignKey: 'group_id',
    });

    Messages.hasOne(models.MessageReactions, {
      foreignKey: 'message_id',
    });
  };

  return Messages;
};
