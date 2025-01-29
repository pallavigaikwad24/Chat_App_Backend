const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Groups = sequelize.define('Groups', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    group_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_ids: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    profile_image: {
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
    tableName: 'Groups',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Groups_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

  Groups.associate = function (models) {
    Groups.belongsTo(models.Users, {
      foreignKey: 'admin_id',
    });
    Groups.hasMany(models.Messages, {
      foreignKey: 'group_id',
    });
  };

  return Groups
};
