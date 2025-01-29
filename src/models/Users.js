const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Users = sequelize.define('Users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    profile_img: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "\/profile.png"
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'Users',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

  Users.associate = function (models) {
    Users.hasOne(models.Groups, {
      foreignKey: 'admin_id',
    });
    Users.hasOne(models.SocketModels, {
      foreignKey: 'user_id',
    });

    Users.hasMany(models.Messages, {
      foreignKey: 'sender_id',
      as: 'SentMessages',
    });

    Users.hasMany(models.Messages, {
      foreignKey: 'receiver_id',
      as: 'ReceivedMessages',
    });
    Users.hasMany(models.MessageReactions, {
      foreignKey: 'user_id',
    });
  };

  return Users;
};
