const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const MessageReactions = sequelize.define('MessageReactions', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    message_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    reaction: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'MessageReactions',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "MessageReactions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

  MessageReactions.associate = (models) => {
    // One-to-one relationship for sender
    MessageReactions.belongsTo(models.Users, {
      foreignKey: 'user_id',
    });
    
    MessageReactions.belongsTo(models.Messages, {
      foreignKey: 'message_id',
    });
  };

  return MessageReactions;
};
