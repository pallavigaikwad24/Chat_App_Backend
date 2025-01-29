const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const SocketModels =  sequelize.define('SocketModels', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    socketId: {
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
    tableName: 'SocketModels',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "SocketModels_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

  SocketModels.associate = (models) => {
    // One-to-one relationship for sender
    SocketModels.belongsTo(models.Users, {
      foreignKey: 'user_id',
    });
  };

  return SocketModels;

};
