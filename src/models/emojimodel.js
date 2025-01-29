'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmojiModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmojiModel.init({
    code: DataTypes.TEXT,
    name: DataTypes.TEXT,
    is_deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'EmojiModel',
  });
  return EmojiModel;
};