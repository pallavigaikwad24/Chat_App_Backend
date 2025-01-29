var DataTypes = require("sequelize").DataTypes;
var _Groups = require("./Groups");
var _MessageReactions = require("./MessageReactions");
var _Messages = require("./Messages");
var _SequelizeMeta = require("./SequelizeMeta");
var _SocketModels = require("./SocketModels");
var _Users = require("./Users");
var _sessions = require("./sessions");

function initModels(sequelize) {
  var Groups = _Groups(sequelize, DataTypes);
  var MessageReactions = _MessageReactions(sequelize, DataTypes);
  var Messages = _Messages(sequelize, DataTypes);
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var SocketModels = _SocketModels(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);
  var sessions = _sessions(sequelize, DataTypes);


  return {
    Groups,
    MessageReactions,
    Messages,
    SequelizeMeta,
    SocketModels,
    Users,
    sessions,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
